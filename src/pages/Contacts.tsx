import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, Clock } from "lucide-react";
import SEO from "@/components/SEO";

const Contacts = () => {
  return (
    <>
      <SEO 
        title="Контакты - Аренда Автовышек в Тамбове | АвтоВышка68"
        description="Свяжитесь с нами для аренды автовышки в Тамбове. ☎ +7 915 674 63 90, +7 915 674 02 82. Работаем круглосуточно. Быстрый выезд. Тамбов и область."
        keywords="контакты аренда автовышки Тамбов, телефон автовышка, заказать автовышку Тамбов, вызвать автовышку, автовышка телефон Тамбов"
      />
      <div className="animate-fade-in">
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">Контакты</h1>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <Card className="bg-gradient-card shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-full bg-primary/10">
                      <Phone className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="text-2xl font-semibold">Телефоны</h2>
                  </div>
                  <div className="space-y-3">
                    <a href="tel:+79156746390" className="block">
                      <Button variant="default" size="lg" className="w-full text-lg gap-3 shadow-lg animate-pulse-glow">
                        <Phone className="h-5 w-5" />
                        +7 915 674 63 90
                      </Button>
                    </a>
                    <a href="tel:+79156740282" className="block">
                      <Button variant="default" size="lg" className="w-full text-lg gap-3 shadow-lg animate-pulse-glow">
                        <Phone className="h-5 w-5" />
                        +7 915 674 02 82
                      </Button>
                    </a>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4 text-center">
                    Нажмите, чтобы позвонить
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-full bg-primary/10">
                      <MapPin className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="text-2xl font-semibold">Адрес</h2>
                  </div>
                  <p className="text-lg text-foreground mb-2">Город Тамбов</p>
                  <p className="text-muted-foreground">Тамбовская область</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-primary text-primary-foreground mb-12">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <Clock className="h-8 w-8" />
                  <h2 className="text-2xl font-semibold">Режим работы</h2>
                </div>
                <p className="text-lg">
                  Выезд машины в любое удобное для Вас время.<br />
                  Работаем без выходных.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-xl">
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-6 text-center">Как с нами связаться?</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-background/50">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">Позвоните нам</h3>
                      <p className="text-muted-foreground">
                        Получите бесплатную консультацию по телефону
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-lg bg-background/50">
                    <div className="p-2 rounded-full bg-primary/10">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">Выезд специалиста</h3>
                      <p className="text-muted-foreground">
                        Наш специалист может выехать на место для оценки работ
                      </p>
                    </div>
                  </div>

                  <div className="text-center pt-4">
                    <p className="text-muted-foreground mb-4">
                      Мы работаем по всей Тамбовской области
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <a href="tel:+79156746390">
                        <Button size="lg" className="shadow-xl w-full sm:w-auto">
                          <Phone className="h-5 w-5 mr-2" />
                          +7 915 674 63 90
                        </Button>
                      </a>
                      <a href="tel:+79156740282">
                        <Button size="lg" className="shadow-xl w-full sm:w-auto">
                          <Phone className="h-5 w-5 mr-2" />
                          +7 915 674 02 82
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default Contacts;
