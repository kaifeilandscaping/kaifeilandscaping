import { COMPANY_NAME } from '../constants/text';

export default function About() {
  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        {/* About Us Heading */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-light text-[#C4A57B] mb-4">
            About Us
          </h2>
          <p className="text-xl text-[#666] font-light">
            Unique customized design
          </p>
        </div>
        
        {/* Description */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-base md:text-lg text-[#3d3d3d] leading-relaxed">
            With over a decade of experience in the landscaping industry, our experts always offer you high-quality services, with design ideas unique to you and your vision of dreamland
          </p>
        </div>
        
        {/* Architectural Illustration - Placeholder */}
        <div className="w-full max-w-4xl mx-auto">
          <div className="relative w-full">
            <img src="/home/hero.png" alt={`${COMPANY_NAME} Hero`} />
          </div>
        </div>
      </div>
    </section>
  );
}
