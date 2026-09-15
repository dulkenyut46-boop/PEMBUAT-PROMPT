import React, { useState } from "react";
import { PROMPT_TEMPLATES } from "../../data/templates";
import { usePrompts } from "../../context/PromptContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/Card";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Sparkles, Copy, Check, ArrowRight, Layers } from "lucide-react";

export const TemplatesGallery: React.FC = () => {
  const { prefillGenerator, showToast, recordCopy } = usePrompts();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleUseTemplate = (tpl: typeof PROMPT_TEMPLATES[0]) => {
    prefillGenerator({
      title: tpl.name,
      description: tpl.description,
      category: tpl.category,
      tags: tpl.tags,
      techStack: tpl.recommendedStack,
      fullPromptContent: tpl.samplePrompt
    });
    showToast(`Template "${tpl.name}" dimuat ke Studio Pembuat!`, "success");
  };

  const handleCopy = async (tpl: typeof PROMPT_TEMPLATES[0]) => {
    try {
      await navigator.clipboard.writeText(tpl.samplePrompt);
      setCopiedId(tpl.id);
      showToast(`Prompt template "${tpl.name}" berhasil disalin!`, "success");
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      showToast("Gagal menyalin.", "error");
    }
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#00AA13]/10 via-[#00AA13]/5 to-transparent border border-[#00AA13]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
            <Layers className="h-5 w-5 text-[#00AA13]" />
            <span>Pilihan Template Standar Arsitektur Indonesia</span>
          </h2>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 max-w-2xl leading-relaxed">
            Template prompt ini telah diuji dan diformat lengkap untuk menghasilkan aplikasi web production-ready: struktur layout, auth, database, dan konfigurasi SPA.
          </p>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {PROMPT_TEMPLATES.map((tpl) => {
          const isCopied = copiedId === tpl.id;

          return (
            <Card
              key={tpl.id}
              className="flex flex-col justify-between hover:border-[#00AA13]/40 hover:shadow-md transition-all group"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <Badge variant="gojek">{tpl.category}</Badge>
                  <span className="text-[10px] font-bold text-neutral-400">
                    Peringkat #{tpl.popularRank}
                  </span>
                </div>
                <CardTitle className="text-base group-hover:text-[#00AA13] transition-colors">
                  {tpl.name}
                </CardTitle>
                <CardDescription className="text-xs line-clamp-2">
                  {tpl.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-3 pt-0">
                {/* Stack box */}
                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-100 dark:border-neutral-800 text-[11px] space-y-1">
                  <div className="text-neutral-500 dark:text-neutral-400">
                    <strong>Framework:</strong> {tpl.recommendedStack.framework}
                  </div>
                  <div className="text-neutral-500 dark:text-neutral-400">
                    <strong>Database:</strong> {tpl.recommendedStack.database}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {tpl.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 font-medium"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="pt-3 flex items-center justify-between gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopy(tpl)}
                  className="gap-1 text-xs"
                >
                  {isCopied ? <Check className="h-3.5 w-3.5 text-[#00AA13]" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{isCopied ? "Tersalin" : "Salin"}</span>
                </Button>

                <Button
                  size="sm"
                  onClick={() => handleUseTemplate(tpl)}
                  className="gap-1.5 text-xs font-bold"
                >
                  <span>Buka di Studio</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
