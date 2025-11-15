import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Wrench, Clock, Shield } from "lucide-react";
import kamazImg from "@/assets/kamaz.png";
import vyshkaImg from "@/assets/vyshka-all.jpg";

const Index = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Аренда Автовышек в <span className="text-primary">Тамбове</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Мы предлагаем услуги аренды автовышек для выполнения самых разнообразных работ в Тамбове и Тамбовской области.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/request">
                  <Button size="lg" className="gap-2 shadow-xl">
                    Оставить заявку
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <a href="tel:+79156746390">
                  <Button size="lg" variant="outline">
                    Позвонить
                  </Button>
                </a>
              </div>
            </div>
            <div className="relative">
              <img
                src={kamazImg}
                alt="Автовышка КАМАЗ"
                className="rounded-2xl shadow-2xl w-full hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Почему выбирают нас?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Wrench className="h-10 w-10 text-primary" />,
                title: "Профессионализм",
                description: "Опытные водители-машинисты с многолетним стажем",
              },
              {
                icon: <Clock className="h-10 w-10 text-primary" />,
                title: "Оперативность",
                description: "Выезд в любое удобное для вас время",
              },
              {
                icon: <Shield className="h-10 w-10 text-primary" />,
                title: "Надежность",
                description: "Исправная техника с регулярным обслуживанием",
              },
              {
                icon: <CheckCircle className="h-10 w-10 text-primary" />,
                title: "Без посредников",
                description: "Заказ машины напрямую, экономия ваших средств",
              },
            ].map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-card">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Description Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-6 text-foreground">
            <p className="text-lg leading-relaxed">
              При проведении высотных работ (строительных, монтажных, ремонтных) без использования специальной техники не обойтись. 
              Покупка дорогостоящей техники, особенно для разовых или сезонных работ, зачастую бывает неоправданна. В таких ситуациях 
              аренда автовышки поможет не только выполнить необходимые операции, но и сэкономить время и деньги клиента.
            </p>
            <p className="text-lg leading-relaxed">
              Ведь при аренде Вам не придется тратиться на покупку, транспортировку, ремонт и обслуживание машины. Поэтому последнее 
              время к услугам аренды автовышек все чаще прибегают не только небольшие компании и частные лица, но и крупные строительные 
              компании в поисках подрядчиков.
            </p>
          </div>
        </div>
      </section>

      {/* Equipment Section */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Наша техника</h2>
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden shadow-2xl">
              <img src={vyshkaImg} alt="Парк автовышек" className="w-full h-auto" />
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-4">Автовышки ВС 22, АГП 22 и ВС 28</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>На базе ЗИЛ 130 и КАМАЗ</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Высота подъема до 28 метров</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Не требуют дополнительных опор</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Мобильность и маневренность</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Готовы начать работу?</h2>
            <p className="text-lg text-muted-foreground">
              Свяжитесь с нами для консультации или оставьте заявку на аренду автовышки
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/request">
                <Button size="lg" className="gap-2 shadow-xl">
                  Оставить заявку
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/contacts">
                <Button size="lg" variant="outline">
                  Контакты
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
