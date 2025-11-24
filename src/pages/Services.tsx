import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import {
  Building,
  Lightbulb,
  Snowflake,
  Wind,
  Sparkles,
  Zap,
  TreePine,
  Camera,
  Heart,
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <Building className="h-8 w-8" />,
      title: "Монтаж рекламной продукции",
      description: "Установка растяжек, билбордов, баннеров, вывесок",
    },
    {
      icon: <Snowflake className="h-8 w-8" />,
      title: "Сезонная очистка крыш",
      description: "Удаление снега и сосулек с крыш зданий",
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Праздничное оформление",
      description: "Установка и украшение елок, тематическое оформление зданий",
    },
    {
      icon: <Wind className="h-8 w-8" />,
      title: "Обслуживание кондиционеров",
      description: "Монтаж, ремонт и обслуживание климатического оборудования",
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Клининговые работы",
      description: "Мойка фасадов и стеклопакетов",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Монтаж инженерных коммуникаций",
      description: "Установка ЛЭП, антенн, протяжка проводов",
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Ремонт осветительных приборов",
      description: "Обслуживание уличных фонарей и внешнего освещения",
    },
    {
      icon: <TreePine className="h-8 w-8" />,
      title: "Опилка деревьев",
      description: "Профессиональная обрезка и спил деревьев",
    },
    {
      icon: <Building className="h-8 w-8" />,
      title: "Фасадные работы",
      description: "Ремонт, реставрация и оформление фасадов зданий",
    },
    {
      icon: <Camera className="h-8 w-8" />,
      title: "Проведение кино- и фотосъемок",
      description: "Аренда автовышки для профессиональных съемок",
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Спасательные работы",
      description: "Экстренная помощь в сложных ситуациях",
    },
  ];

  return (
    <>
      <SEO 
        title="Услуги по Аренде Автовышек в Тамбове | АвтоВышка68"
        description="Широкий спектр услуг: монтаж рекламы, высотные работы, очистка крыш, фасадные работы, праздничное оформление в Тамбове. Профессиональные операторы. ☎ +7 915 674 63 90"
        keywords="услуги автовышки Тамбов, монтаж рекламы, высотные работы, очистка крыш, ремонт фасадов, праздничное оформление, обрезка деревьев, монтажные работы, услуги автогидроподъемника"
      />
      <div className="animate-fade-in">
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Аренда Автовышек</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Услуга автовышки пользуется повышенной и оправданной популярностью, поскольку покупка техники для проведения работ 
              на высоте достаточно дорого обходится, и затраты далеко не всегда окупаются. Для проведения разовых высотных работ 
              аренда автовышки становится эффективным решением.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6 mb-12">
            <Card className="bg-gradient-card">
              <CardContent className="pt-6">
                <p className="text-foreground leading-relaxed mb-4">
                  Автовышки мобильны, не требуют усиленных конструкций и дополнительных опор, а значит, экономят не только время 
                  и деньги заказчика, но и пространство для размещения.
                </p>
                <p className="text-foreground leading-relaxed">
                  Автовышка необходима для доставки людей с инструментами и материалом на необходимую высоту для проведения 
                  различных операций и может использоваться в самых разнообразных сферах. К нашим услугам часто прибегают не 
                  только строительные компании, коммунальные хозяйства и предприятия электроэнергетики, но и организации, 
                  занимающиеся рекламным бизнесом, коммерческие организации и частные лица.
                </p>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-3xl font-bold text-center mb-8">Наиболее распространенные услуги</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-card">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="text-primary">{service.icon}</div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-8 text-center">
              <p className="text-lg mb-4">
                И любые другие услуги. Мы готовы оказать помощь в обслуживании, строительстве и ремонте, а также помочь в 
                реализации самых разнообразных и креативных идей, вплоть до подъема букета роз к балкону любимой.
              </p>
            </CardContent>
          </Card>

          <div className="text-center mt-12">
            <Link to="/request">
              <Button size="lg" className="shadow-xl">
                Оставить заявку на аренду
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default Services;
