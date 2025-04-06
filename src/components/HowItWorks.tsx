
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    number: "01",
    title: "Upload Your Collection",
    description: "Simply drag and drop a ZIP file with your jewelry images. Our system accepts images in any format."
  },
  {
    number: "02",
    title: "AI Analysis",
    description: "Our advanced AI identifies jewelry types, materials, and styles, then automatically groups similar items."
  },
  {
    number: "03",
    title: "Review and Edit",
    description: "Quickly review AI-generated product descriptions and make any necessary edits before publishing."
  },
  {
    number: "04",
    title: "Multi-Platform Selling",
    description: "List your jewelry across multiple marketplaces with a single click and track all sales in one place."
  }
];

interface Step {
  title: string;
  description: string;
  icon?: React.ReactNode;
  number?: string;
}

interface HowItWorksProps {
  steps: Step[];
}

const HowItWorks = ({ steps = [
  {
    number: "01",
    title: "Upload Your Collection",
    description: "Simply drag and drop a ZIP file with your jewelry images. Our system accepts images in any format."
  },
  {
    number: "02",
    title: "AI Analysis",
    description: "Our advanced AI identifies jewelry types, materials, and styles, then automatically groups similar items."
  },
  {
    number: "03",
    title: "Review and Edit",
    description: "Quickly review AI-generated product descriptions and make any necessary edits before publishing."
  },
  {
    number: "04",
    title: "Multi-Platform Selling",
    description: "List your jewelry across multiple marketplaces with a single click and track all sales in one place."
  }
] }: HowItWorksProps) => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">How It Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our streamlined process takes your jewelry from photos to sales with minimal effort.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="elegant-card overflow-hidden border-t-4 border-t-gold">
              <CardContent className="p-6">
                {step.icon ? (
                  <div className="mb-4">{step.icon}</div>
                ) : (
                  <div className="text-4xl font-playfair font-bold text-gold mb-4">{index + 1}</div>
                )}
                <h3 className="font-playfair text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
