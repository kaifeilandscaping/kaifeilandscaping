import ContactHero from '../components/contact/ContactHero';
import ContactForm from '../components/contact/ContactForm';
import ContactInfo from '../components/contact/ContactInfo';

export const metadata = {
  title: 'Contact Us - Kaifei Landscaping',
  description: 'Get in touch with Kaifei Landscaping for your next outdoor project. We\'re here to help transform your space.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <ContactHero />
      
      <section className="py-16 md:py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                  Send Us a Message
                </h2>
                <p className="text-muted-foreground text-lg">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>
              <ContactForm />
            </div>
            
            {/* Contact Information */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                  Get in Touch
                </h2>
                <p className="text-muted-foreground text-lg">
                  Reach out to us through any of the following channels.
                </p>
              </div>
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
