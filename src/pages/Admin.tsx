import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, Search, Calendar, Filter, Star } from "lucide-react";

interface Request {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  message: string;
  status: "new" | "in_progress" | "completed" | "cancelled";
  created_at: string;
  updated_at: string;
}

interface Review {
  id: string;
  name: string;
  phone: string | null;
  rating: number;
  comment: string;
  approved: boolean;
  created_at: string;
}

interface AdminProps {
  skipAuth?: boolean;
}

const Admin = ({ skipAuth = false }: AdminProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [requests, setRequests] = useState<Request[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<Request[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  useEffect(() => {
    if (!skipAuth) {
      checkAuth();
    }
    fetchRequests();
    fetchReviews();

    // Real-time подписка на изменения отзывов
    const reviewsChannel = supabase
      .channel('reviews-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'reviews'
        },
        () => {
          console.log('Reviews changed, reloading...');
          fetchReviews();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(reviewsChannel);
    };
  }, [skipAuth]);

  useEffect(() => {
    applyFilters();
  }, [requests, searchQuery, statusFilter, dateFrom, dateTo]);

  const checkAuth = async () => {
    // Обычная проверка аутентификации
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      navigate("/login");
      return;
    }

    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .single();

    if (!roleData) {
      toast({
        title: "Доступ запрещен",
        description: "У вас нет прав администратора",
        variant: "destructive",
      });
      navigate("/");
    }
  };

  const fetchRequests = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setRequests(data || []);
    } catch (error: any) {
      console.error("Error fetching requests:", error);
      toast({
        title: "Ошибка загрузки",
        description: "Не удалось загрузить заявки",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      setIsLoadingReviews(true);
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching reviews:", error);
        throw error;
      }

      console.log('Loaded reviews:', data);
      setReviews(data || []);
    } catch (error: any) {
      console.error("Error fetching reviews:", error);
      toast({
        title: "Ошибка загрузки отзывов",
        description: error.message || "Не удалось загрузить отзывы",
        variant: "destructive",
      });
    } finally {
      setIsLoadingReviews(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...requests];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (req) =>
          req.name.toLowerCase().includes(query) ||
          req.phone.includes(query) ||
          req.email?.toLowerCase().includes(query) ||
          req.message.toLowerCase().includes(query)
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((req) => req.status === statusFilter);
    }

    // Date range filter
    if (dateFrom) {
      filtered = filtered.filter(
        (req) => new Date(req.created_at) >= new Date(dateFrom)
      );
    }
    if (dateTo) {
      filtered = filtered.filter(
        (req) => new Date(req.created_at) <= new Date(dateTo + "T23:59:59")
      );
    }

    setFilteredRequests(filtered);
  };

  const updateStatus = async (id: string, newStatus: Request["status"]) => {
    try {
      const { error } = await supabase
        .from("requests")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Статус обновлен",
        description: "Статус заявки успешно изменен",
      });

      fetchRequests();
    } catch (error: any) {
      console.error("Error updating status:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось обновить статус",
        variant: "destructive",
      });
    }
  };

  const updateReviewApproval = async (id: string, approved: boolean) => {
    try {
      const { error } = await supabase
        .from("reviews")
        .update({ approved })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: approved ? "Отзыв одобрен" : "Отзыв отклонен",
        description: approved ? "Отзыв появится на сайте" : "Отзыв скрыт с сайта",
      });

      fetchReviews();
    } catch (error: any) {
      console.error("Error updating review:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось обновить отзыв",
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const getStatusColor = (status: Request["status"]) => {
    switch (status) {
      case "new":
        return "bg-blue-500";
      case "in_progress":
        return "bg-yellow-500";
      case "completed":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusLabel = (status: Request["status"]) => {
    switch (status) {
      case "new":
        return "Новая";
      case "in_progress":
        return "В работе";
      case "completed":
        return "Завершена";
      case "cancelled":
        return "Отменена";
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Админ-панель</h1>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="mr-2 h-4 w-4" />
            Выйти
          </Button>
        </div>

        <Tabs defaultValue="requests" className="w-full">
          <TabsList className="grid w-full md:w-[400px] grid-cols-2 mb-6">
            <TabsTrigger value="requests">Заявки</TabsTrigger>
            <TabsTrigger value="reviews">Отзывы</TabsTrigger>
          </TabsList>

          <TabsContent value="requests">{/* Requests content */}

            <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Фильтры
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="search" className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Поиск
                </Label>
                <Input
                  id="search"
                  placeholder="Имя, телефон, email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Статус</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Все статусы" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все</SelectItem>
                    <SelectItem value="new">Новые</SelectItem>
                    <SelectItem value="in_progress">В работе</SelectItem>
                    <SelectItem value="completed">Завершенные</SelectItem>
                    <SelectItem value="cancelled">Отмененные</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateFrom" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Дата от
                </Label>
                <Input
                  id="dateFrom"
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateTo" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Дата до
                </Label>
                <Input
                  id="dateTo"
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">{requests.length}</div>
              <div className="text-sm text-muted-foreground">Всего заявок</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-blue-500">
                {requests.filter((r) => r.status === "new").length}
              </div>
              <div className="text-sm text-muted-foreground">Новые</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-yellow-500">
                {requests.filter((r) => r.status === "in_progress").length}
              </div>
              <div className="text-sm text-muted-foreground">В работе</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-500">
                {requests.filter((r) => r.status === "completed").length}
              </div>
              <div className="text-sm text-muted-foreground">Завершены</div>
            </CardContent>
          </Card>
            </div>

            {/* Requests List */}
            <div className="space-y-4">
          {isLoading ? (
            <Card>
              <CardContent className="p-6 text-center">
                Загрузка заявок...
              </CardContent>
            </Card>
          ) : filteredRequests.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center text-muted-foreground">
                Заявки не найдены
              </CardContent>
            </Card>
          ) : (
            filteredRequests.map((request) => (
              <Card key={request.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold">{request.name}</h3>
                        <Badge className={getStatusColor(request.status)}>
                          {getStatusLabel(request.status)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        📞 {request.phone}
                      </p>
                      {request.email && (
                        <p className="text-sm text-muted-foreground mb-1">
                          📧 {request.email}
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground mb-3">
                        📅 {new Date(request.created_at).toLocaleString("ru-RU")}
                      </p>
                      <p className="text-sm bg-muted p-3 rounded-md">
                        {request.message}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 min-w-[180px]">
                      <Select
                        value={request.status}
                        onValueChange={(value) =>
                          updateStatus(request.id, value as Request["status"])
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">Новая</SelectItem>
                          <SelectItem value="in_progress">В работе</SelectItem>
                          <SelectItem value="completed">Завершена</SelectItem>
                          <SelectItem value="cancelled">Отменена</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            {/* Reviews Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold">{reviews.length}</div>
                  <div className="text-sm text-muted-foreground">Всего отзывов</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-green-500">
                    {reviews.filter((r) => r.approved).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Одобренные</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-yellow-500">
                    {reviews.filter((r) => !r.approved).length}
                  </div>
                  <div className="text-sm text-muted-foreground">На модерации</div>
                </CardContent>
              </Card>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
              {isLoadingReviews ? (
                <Card>
                  <CardContent className="p-6 text-center">
                    Загрузка отзывов...
                  </CardContent>
                </Card>
              ) : reviews.length === 0 ? (
                <Card>
                  <CardContent className="p-6 text-center text-muted-foreground">
                    Отзывы не найдены
                  </CardContent>
                </Card>
              ) : (
                reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold">{review.name}</h3>
                            <Badge className={review.approved ? "bg-green-500" : "bg-yellow-500"}>
                              {review.approved ? "Одобрен" : "На модерации"}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          {review.phone && (
                            <p className="text-sm text-muted-foreground mb-1">
                              📞 {review.phone}
                            </p>
                          )}
                          <p className="text-sm text-muted-foreground mb-3">
                            📅 {new Date(review.created_at).toLocaleString("ru-RU")}
                          </p>
                          <p className="text-sm bg-muted p-3 rounded-md">
                            {review.comment}
                          </p>
                        </div>
                        <div className="flex flex-col gap-2 min-w-[180px]">
                          <Button
                            onClick={() => updateReviewApproval(review.id, true)}
                            disabled={review.approved}
                            variant={review.approved ? "outline" : "default"}
                            className="w-full"
                          >
                            Одобрить
                          </Button>
                          <Button
                            onClick={() => updateReviewApproval(review.id, false)}
                            disabled={!review.approved}
                            variant="destructive"
                            className="w-full"
                          >
                            Отклонить
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
