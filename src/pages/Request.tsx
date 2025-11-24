import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, User, MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import SEO from "@/components/SEO";

const requestSchema = z.object({
  name: z.string().trim().min(1, "Имя обязательно").max(100, "Имя не должно превышать 100 символов"),
  phone: z.string().trim().min(10, "Введите корректный номер телефона").max(15, "Номер телефона слишком длинный"),
  email: z.string().trim().email("Введите корректный email").max(255, "Email слишком длинный").optional().or(z.literal("")),
  message: z.string().trim().min(10, "Сообщение должно содержать минимум 10 символов").max(1000, "Сообщение не должно превышать 1000 символов"),
});

const Request = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate input using zod schema
      const validatedData = requestSchema.parse(formData);
      
      const { data, error } = await supabase.functions.invoke(
        "send-telegram-notification",
        {
          body: validatedData,
        }
      );

      if (error) {
        throw error;
      }

      toast({
        title: "Заявка отправлена!",
        description: "Мы получили вашу заявку и свяжемся с вами в ближайшее время.",
      });

      // Reset form
      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Ошибка валидации",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Ошибка отправки",
          description: "Не удалось отправить заявку. Пожалуйста, попробуйте позже или позвоните нам напрямую.",
          variant: "destructive",
        });
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <SEO 
        title="Оставить Заявку на Аренду Автовышки в Тамбове | АвтоВышка68"
        description="Закажите аренду автовышки в Тамбове онлайн. Быстрая обработка заявок. Бесплатная консультация. Расчет стоимости за 5 минут. ☎ +7 915 674 63 90"
        keywords="заказать автовышку Тамбов, заявка аренда автовышки, онлайн заказ автовышки, быстрый заказ автогидроподъемника"
      />
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
    </>
  );
};

export default Request;
