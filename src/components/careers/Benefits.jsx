import { TrendingUp, Terminal, Users, GraduationCap } from 'lucide-react';
import ScrollReveal from '../ScrollReveal';

const Benefits = () => {
  const cardStyle = { background: 'var(--bg-card)', borderColor: 'var(--border)', transition: 'background 0.4s ease, border-color 0.4s ease' };
  const textPrimary  = { color: 'var(--text-primary)' };
  const textSecondary = { color: 'var(--text-secondary)' };
  const sectionBg   = { background: 'var(--bg)', transition: 'background 0.4s ease' };

  const benefits = [
    {
      icon: <TrendingUp className="h-6 w-6 text-primary-blue" />,
      title: "Growth",
      desc: "Accelerate your career with clear paths for advancement and mentorship from industry veterans."
    },
    {
      icon: <Terminal className="h-6 w-6 text-primary-blue" />,
      title: "Technology",
      desc: "Work with the latest tech stacks and contribute to bleeding-edge enterprise digital solutions."
    },
    {
      icon: <Users className="h-6 w-6 text-primary-blue" />,
      title: "Culture",
      desc: "A collaborative, inclusive environment where every voice is heard and every spirit matters."
    },
    {
      icon: <GraduationCap className="h-6 w-6 text-primary-blue" />,
      title: "Learning",
      desc: "Generous learning stipends, weekly workshops, and access to premium education resources."
    }
  ];

  return (
    <section id="benefits" className="py-20 md:py-28 px-margin-mobile md:px-margin-tablet lg:px-margin-desktop border-t" style={{ ...sectionBg, borderTopColor: 'var(--border)' }}>
      <div className="max-w-container-max mx-auto">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="headline-xl mb-4" style={textPrimary}>
              Why Spirit Data Solutions?
            </h2>
            <p className="text-base md:text-lg" style={textSecondary}>
              We believe in empowering our employees with a work environment that fosters creativity, continuous growth, and a true sense of belonging.
            </p>
          </div>
        </ScrollReveal>

        {/* 4-column feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.1}>
              <div className="p-6 rounded border hover:border-primary-blue/20 shadow-level-1 hover:shadow-level-2 transform hover:-translate-y-1 transition-all duration-300 text-left h-full flex flex-col items-start" style={cardStyle}>
                <div className="p-3 bg-primary-blue/5 rounded-full w-fit mb-5">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold mb-3" style={textPrimary}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={textSecondary}>{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
