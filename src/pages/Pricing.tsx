import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, Phone } from "lucide-react";

const Pricing = () => {
  return (
    <div className="animate-fade-in">
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">Цены на Аренду Автовышек</h1>

            <Card className="mb-12 bg-gradient-card shadow-xl">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold mb-4 text-primary">Стоимость услуг</h2>
                    <p className="text-lg text-foreground leading-relaxed">
                      Реальная цена проводимых работ может варьироваться и зависит от маршрута, требований к транспортировке, 
                      срока аренды, сложности работ и т. п.
                    </p>
                  </div>

                  <div className="border-t border-border pt-6">
                    <h3 className="text-xl font-semibold mb-4">Факторы, влияющие на стоимость:</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">Маршрут и расстояние до объекта</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">Высота проведения работ</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">Срок аренды автовышки</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">Сложность выполняемых работ</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">Требования к транспортировке</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">Особенности объекта и условия работы</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-12 bg-primary/5 border-primary/20">
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-4 text-center">Как узнать точную стоимость?</h2>
                <p className="text-lg text-center text-muted-foreground mb-6">
                  Более точную стоимость работ наши специалисты могут сообщить после консультации по контактным телефонам, 
                  или после выезда на место проведения работ для осмотра и оценки.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="tel:+79156746390">
                    <Button size="lg" variant="default" className="gap-2 w-full sm:w-auto shadow-lg">
                      <Phone className="h-5 w-5" />
                      Позвонить для консультации
                    </Button>
                  </a>
                  <Link to="/request">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Оставить заявку
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card">
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-4">Условия оплаты</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Для юридических лиц</p>
                      <p className="text-muted-foreground">Возможен безналичный расчет</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Для физических лиц</p>
                      <p className="text-muted-foreground">Наличный расчет</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Индивидуальный подход</p>
                      <p className="text-muted-foreground">Обсуждаем условия с каждым клиентом</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
