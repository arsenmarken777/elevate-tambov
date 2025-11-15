import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, User, MessageSquare } from "lucide-react";

const Request = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real application, this would send the data to a server
    console.log("Form submitted:", formData);
    
    toast({
      title: "Заявка отправлена!",
      description: "Мы свяжемся с вами в ближайшее время.",
    });

    // Reset form
    setFormData({
      name: "",
      phone: "",
      email: "",
      message: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="animate-fade-in">
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Оставить Заявку</h1>
            <p className="text-center text-lg text-muted-foreground mb-12">
              Заполните форму, и мы свяжемся с вами для уточнения деталей
            </p>

            <Card className="shadow-2xl bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-2xl">Форма заявки</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-base flex items-center gap-2">
                      <User className="h-4 w-4 text-primary" />
                      Ваше имя *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Иван Иванов"
                      className="text-base h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-base flex items-center gap-2">
                      <Phone className="h-4 w-4 text-primary" />
                      Телефон *
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+7 (___) ___-__-__"
                      className="text-base h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-base flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary" />
                      Email (опционально)
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@mail.com"
                      className="text-base h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-base flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-primary" />
                      Описание работ *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Опишите какие работы необходимо выполнить, высоту подъема, адрес объекта и желаемую дату..."
                      className="min-h-[150px] text-base"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full shadow-xl">
                    Отправить заявку
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="mt-8 bg-primary text-primary-foreground">
              <CardContent className="p-6 text-center">
                <p className="text-lg mb-2">Или позвоните нам напрямую</p>
                <a href="tel:+79156746390">
                  <Button variant="secondary" size="lg" className="gap-2 shadow-lg">
                    <Phone className="h-5 w-5" />
                    +7 915 674 63 90
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Request;
