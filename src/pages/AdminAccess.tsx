import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, CheckCircle, XCircle } from "lucide-react";

const AdminAccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"checking" | "success" | "error">("checking");

  useEffect(() => {
    const token = searchParams.get("token");
    
    if (!token) {
      setStatus("error");
      setTimeout(() => navigate("/"), 2000);
      return;
    }

    // Сохраняем токен в localStorage для доступа к админке
    localStorage.setItem("admin_access_token", token);
    setStatus("success");
    
    // Перенаправляем на админ панель через 1 секунду
    setTimeout(() => {
      navigate("/admin");
    }, 1000);
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-muted">
      <Card className="w-full max-w-md shadow-2xl">
        <CardContent className="p-12 text-center">
          {status === "checking" && (
            <>
              <Shield className="h-16 w-16 text-primary mx-auto mb-4 animate-pulse" />
              <h2 className="text-2xl font-bold mb-2">Проверка доступа...</h2>
              <p className="text-muted-foreground">Подождите немного</p>
            </>
          )}
          
          {status === "success" && (
            <>
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2 text-green-600">Доступ разрешен!</h2>
              <p className="text-muted-foreground">Перенаправление в админ панель...</p>
            </>
          )}
          
          {status === "error" && (
            <>
              <XCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2 text-destructive">Доступ запрещен</h2>
              <p className="text-muted-foreground">Неверная ссылка доступа</p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAccess;
