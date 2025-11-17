import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Target, Users } from 'lucide-react';
import SectionTitle from '@/components/SectionTitle';

const ChoosePathSection = () => {
  const paths = [
    {
      icon: <Calendar className="h-8 w-8" />,
      title: 'Holiday Sprint™',
      description: 'Seasonal Affiliate Sales System',
      detail: 'Get a complete holiday affiliate sales system built in 72 hours.',
      link: '/holiday-explained'
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: 'Affiliate Sales Blueprint™',
      description: '1-on-1 Bootcamp',
      detail: 'Master the system that makes affiliate sales work all year long.',
      link: '/affiliate-sales-blueprint'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Fractional Leadership & Global Teams',
      description: 'Strategic Operations Partnership',
      detail: 'Get executive leadership and global talent without the overhead.',
      link: '/services'
    }
  ];

  return (
    <section className="py-20 px-4 bg-muted">
      <div className="container max-w-6xl mx-auto">
        <SectionTitle
          title="Choose Your Path"
          subtitle="Strategic solutions for every stage of growth"
          center
          className="mb-16"
        />

        <div className="grid md:grid-cols-3 gap-8">
          {paths.map((path, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                  {path.icon}
                </div>
                <CardTitle className="text-2xl mb-2">{path.title}</CardTitle>
                <CardDescription className="text-base">{path.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {path.detail}
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link to={path.link}>Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChoosePathSection;
