import { ArrowRight, Bot, CheckCircle, FileDiff, FileText, Gavel, Scale, Share2, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const features = [
  {
    icon: <FileText />,
    name: 'Document Upload & Analysis',
    description: 'Upload PDF, DOCX, or TXT files. Our AI parses and classifies your documents instantly.',
  },
  {
    icon: <Bot />,
    name: 'AI Risk Analysis',
    description: 'Get comprehensive risk scores and a visual dashboard highlighting potential issues.',
  },
  {
    icon: <Gavel />,
    name: 'Clause-by-Clause Explanation',
    description: 'Understand complex legal jargon with plain English explanations for every clause.',
  },
  {
    icon: <Scale />,
    name: 'Natural Language Contract Generator',
    description: 'Create professional contracts simply by describing what you need in plain English.',
  },
  {
    icon: <FileDiff />,
    name: 'Version Comparison',
    description: 'Track changes between document versions with a side-by-side diff view.',
  },
  {
    icon: <ShieldCheck />,
    name: 'Automated Compliance Checking',
    description: 'Ensure your documents meet GDPR, CCPA, and other regulatory standards automatically.',
  },
   {
    icon: <Share2 />,
    name: 'Collaboration & Workflow',
    description: 'Share documents, add comments, and manage approval workflows with your team.',
  },
];

const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-legal');

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center justify-between">
          <Logo className="text-primary"/>
          <Button asChild>
            <Link href="/dashboard">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold text-primary">
                Democratizing Legal Intelligence
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                LexiDoc AI analyzes legal documents, explains complex clauses, and generates contracts from natural language—all at a fraction of traditional legal costs.
              </p>
              <Button size="lg" asChild>
                 <Link href="/dashboard">Analyze Your First Document <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
            <div className="relative h-64 md:h-full">
              {heroImage && (
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  data-ai-hint={heroImage.imageHint}
                  fill
                  className="rounded-lg object-cover shadow-2xl"
                />
              )}
            </div>
          </div>
        </section>

        <section id="features" className="bg-card py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center space-y-4 mb-12">
                    <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">AI-Powered Legal Assistance</h2>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">From risk analysis to contract generation, we've got you covered.</p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-4">
                            <div className="flex-shrink-0 text-accent h-8 w-8">{feature.icon}</div>
                            <div>
                                <h3 className="text-lg font-semibold">{feature.name}</h3>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

      </main>

       <footer className="bg-secondary py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
             <p>&copy; {new Date().getFullYear()} LexiDoc AI. All rights reserved.</p>
          </div>
       </footer>
    </div>
  );
}
