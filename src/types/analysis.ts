export interface Improvement {
  category: 'Proyectos' | 'Habilidades Técnicas' | 'GitHub' | 'Formato' | 'Keywords' | 'Experiencia'
  suggestion: string
  impact: 'high' | 'medium' | 'low'
}

export interface AnalysisResult {
  score: number
  scoreExplanation: string
  improvements: Improvement[]
  coverLetter: string
  createdAt?: string
}

export interface ClaudeAnalysis {
  score: number
  scoreExplanation: string
  improvements: Improvement[]
  coverLetter: string
}
