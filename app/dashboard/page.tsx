'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  Shield, 
  LogOut,
  User,
  Brain,
  Loader2
} from 'lucide-react';

interface AnalysisResult {
  pros: string[];
  cons: string[];
  nonSideEffects: string[];
}

export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const router = useRouter();

  useEffect(() => {
    const authenticated = localStorage.getItem('authenticated');
    const email = localStorage.getItem('userEmail');
    
    if (!authenticated) {
      router.push('/login');
    } else {
      setIsAuthenticated(true);
      setUserEmail(email || '');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('authenticated');
    localStorage.removeItem('userEmail');
    router.push('/login');
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      setAnalysisResult(null);
    }
  };

  const simulateAIAnalysis = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock AI response
    const mockResult: AnalysisResult = {
      pros: [
        "Promotes faster healing in bone fractures",
        "Biocompatible with human tissue",
        "Minimally invasive during surgery",
        "Shows excellent osseointegration properties",
        "Reduces recovery time by 30-40%"
      ],
      cons: [
        "Potential for long-term inflammation",
        "Might not integrate well with elderly patients' bones",
        "Rare risk of allergic reaction",
        "Higher cost compared to traditional methods",
        "Requires specialized surgical training"
      ],
      nonSideEffects: [
        "No reported interference with MRI scans",
        "No effect on nearby muscle tissues",
        "Proven safe for pediatric use in most cases",
        "Compatible with standard imaging techniques",
        "No adverse effects on blood circulation"
      ]
    };
    
    setAnalysisResult(mockResult);
    setIsAnalyzing(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">Medical AI Analysis</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="w-4 h-4" />
                {userEmail}
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-blue-600" />
                Upload Medical Document
              </CardTitle>
              <CardDescription>
                Upload a PDF document for AI-powered medical analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-700 mb-2">
                    Choose PDF file
                  </p>
                  <p className="text-sm text-gray-500">
                    Click to browse or drag and drop
                  </p>
                </label>
              </div>

              {selectedFile && (
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-blue-900">{selectedFile.name}</p>
                      <p className="text-sm text-blue-600">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <Button
                onClick={simulateAIAnalysis}
                disabled={!selectedFile || isAnalyzing}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700"
              >
                {isAnalyzing ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Analyzing Document...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4" />
                    Start AI Analysis
                  </div>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Analysis Results */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-blue-600" />
                AI Analysis Results
              </CardTitle>
              <CardDescription>
                Medical insights and recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!analysisResult && !isAnalyzing && (
                <div className="text-center py-12 text-gray-500">
                  <Brain className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium mb-2">No Analysis Yet</p>
                  <p className="text-sm">Upload a PDF to start the AI analysis</p>
                </div>
              )}

              {isAnalyzing && (
                <div className="text-center py-12">
                  <div className="relative">
                    <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
                  </div>
                  <p className="text-lg font-medium text-gray-700 mb-2">
                    AI Analysis in Progress
                  </p>
                  <p className="text-sm text-gray-500">
                    Processing medical document and generating insights...
                  </p>
                </div>
              )}

              {analysisResult && (
                <div className="space-y-6">
                  {/* Pros */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <h3 className="font-semibold text-green-900">Medical Benefits</h3>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {analysisResult.pros.length}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      {analysisResult.pros.map((pro, index) => (
                        <div key={index} className="p-3 bg-green-50 rounded-lg border border-green-200">
                          <p className="text-sm text-green-800">{pro}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Cons */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-5 h-5 text-amber-600" />
                      <h3 className="font-semibold text-amber-900">Risks & Considerations</h3>
                      <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                        {analysisResult.cons.length}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      {analysisResult.cons.map((con, index) => (
                        <div key={index} className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                          <p className="text-sm text-amber-800">{con}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Non-Side Effects */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Shield className="w-5 h-5 text-blue-600" />
                      <h3 className="font-semibold text-blue-900">Safety Profile</h3>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        {analysisResult.nonSideEffects.length}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      {analysisResult.nonSideEffects.map((effect, index) => (
                        <div key={index} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <p className="text-sm text-blue-800">{effect}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}