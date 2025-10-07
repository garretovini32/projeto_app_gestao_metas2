
import { GoogleGenAI } from "@google/genai";
import { Goal, Habit } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export async function getAIInsights(goals: Goal[], habits: Habit[]): Promise<string> {
  if (!process.env.API_KEY) {
    throw new Error("API key not found.");
  }

  const goalsText = goals.map(g => `- Meta: ${g.title} (Categoria: ${g.category}, Prazo: ${g.dueDate}, Status: ${g.status})`).join('\n');
  const habitsText = habits.map(h => `- Hábito: ${h.name} (Frequência: ${h.frequency})`).join('\n');

  const prompt = `
    Você é um coach de produtividade e bem-estar. Analise as seguintes metas e hábitos de um usuário e forneça 3 insights acionáveis para ajudá-lo a ter sucesso.
    Seja conciso, encorajador e direto. Aponte sinergias, possíveis conflitos ou sugestões de pequenos ajustes.
    A resposta deve ser em português. Formate a resposta como uma lista de 3 itens, cada um começando com um marcador.

    **Metas Atuais:**
    ${goalsText}

    **Hábitos Atuais:**
    ${habitsText}

    **Sua Análise e Insights:**
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching AI insights:", error);
    return "Desculpe, não foi possível obter os insights no momento. Verifique sua chave de API e tente novamente mais tarde.";
  }
}
