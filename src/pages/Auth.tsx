
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';

export default function Auth() {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resetMode, setResetMode] = useState(false);
  
  const { signIn, signUp, resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      if (resetMode) {
        await resetPassword(email);
        setResetMode(false);
      } else if (activeTab === 'login') {
        await signIn(email, password);
      } else {
        await signUp(email, password, fullName);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left panel: Form */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-6 lg:p-12 bg-cream">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="font-playfair text-3xl font-bold gold-gradient mb-2">Sparkle</h1>
            <p className="text-gray-600">Unlock the value of your jewelry collection</p>
          </div>
          
          {resetMode ? (
            <Card>
              <CardHeader>
                <CardTitle className="font-playfair">Reset Password</CardTitle>
                <CardDescription>Enter your email to receive a password reset link</CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="reset-email">Email</Label>
                    <Input
                      id="reset-email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Send Reset Link
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setResetMode(false)}
                  >
                    Back to Login
                  </Button>
                </CardFooter>
              </form>
            </Card>
          ) : (
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'login' | 'signup')} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              {/* Login Form */}
              <TabsContent value="login">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-playfair">Welcome Back</CardTitle>
                    <CardDescription>Sign in to your account to continue</CardDescription>
                  </CardHeader>
                  <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                      {error && (
                        <Alert variant="destructive">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                      )}
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="name@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="password">Password</Label>
                          <Button 
                            type="button" 
                            variant="link" 
                            className="p-0 h-auto font-normal text-xs"
                            onClick={() => setResetMode(true)}
                          >
                            Forgot password?
                          </Button>
                        </div>
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={isLoading}
                      >
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Sign In
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
              
              {/* Signup Form */}
              <TabsContent value="signup">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-playfair">Create an Account</CardTitle>
                    <CardDescription>Join Sparkle to start selling your jewelry</CardDescription>
                  </CardHeader>
                  <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                      {error && (
                        <Alert variant="destructive">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                      )}
                      
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          placeholder="John Doe"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-email">Email</Label>
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="name@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Password</Label>
                        <Input
                          id="signup-password"
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          minLength={6}
                        />
                        <p className="text-xs text-gray-500">Password must be at least 6 characters</p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={isLoading}
                      >
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Create Account
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
            </Tabs>
          )}
          
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              By signing in or creating an account, you agree to our{' '}
              <Link to="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
      
      {/* Right panel: Brand imagery */}
      <div className="hidden lg:block w-1/2 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-white text-center px-8">
            <h2 className="font-playfair text-4xl mb-4 font-bold">Transform Your Jewelry Collection</h2>
            <p className="text-lg max-w-md">
              "Every piece of jewelry tells a story. Let's help you share yours with the world."
            </p>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center"></div>
      </div>
    </div>
  );
}
