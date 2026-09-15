import React, { useState, useEffect } from "react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { Input, Textarea } from "../ui/Input";
import { Select } from "../ui/Select";
import { usePrompts } from "../../context/PromptContext";
import { PromptCategory, PromptStatus, ComplexityLevel } from "../../types/prompt";

export const PromptEditModal: React.FC = () => {
  const { editingPrompt, isEditModalOpen, setIsEditModalOpen, updatePrompt } = usePrompts();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<PromptCategory>("SaaS & Dashboard");
  const [status, setStatus] = useState<PromptStatus>("Aktif");
  const [complexity, setComplexity] = useState<ComplexityLevel>("Menengah");
  const [tagsInput, setTagsInput] = useState("");
  const [fullPromptContent, setFullPromptContent] = useState("");

  useEffect(() => {
    if (editingPrompt) {
      setTitle(editingPrompt.title);
      setDescription(editingPrompt.description);
      setCategory(editingPrompt.category);
      setStatus(editingPrompt.status);
      setComplexity(editingPrompt.complexity);
      setTagsInput(editingPrompt.tags.join(", "));
      setFullPromptContent(editingPrompt.fullPromptContent);
    }
  }, [editingPrompt]);

  if (!editingPrompt) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !fullPromptContent.trim()) return;

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    updatePrompt(editingPrompt.id, {
      title: title.trim(),
      description: description.trim(),
      category,
      status,
      complexity,
      tags: tags.length > 0 ? tags : editingPrompt.tags,
      fullPromptContent: fullPromptContent.trim()
    });

    setIsEditModalOpen(false);
  };

  return (
    <Modal
      isOpen={isEditModalOpen}
      onClose={() => setIsEditModalOpen(false)}
      title="Edit Spesifikasi Prompt"
      description="Perbarui informasi dan isi prompt web secara langsung"
      maxWidth="3xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Judul Prompt"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <Textarea
          label="Deskripsi Kebutuhan"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Select
            label="Kategori"
            value={category}
            onChange={(e) => setCategory(e.target.value as PromptCategory)}
          >
            <option value="Edukasi">Edukasi</option>
            <option value="SaaS & Dashboard">SaaS & Dashboard</option>
            <option value="E-Commerce">E-Commerce</option>
            <option value="On-Demand & Logistik">On-Demand & Logistik</option>
            <option value="Fintech">Fintech</option>
            <option value="Kesehatan">Kesehatan</option>
            <option value="UMKM & Bisnis">UMKM & Bisnis</option>
          </Select>

          <Select
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value as PromptStatus)}
          >
            <option value="Aktif">Aktif</option>
            <option value="Draft">Draft</option>
            <option value="Diarsipkan">Diarsipkan</option>
          </Select>

          <Select
            label="Kompleksitas"
            value={complexity}
            onChange={(e) => setComplexity(e.target.value as ComplexityLevel)}
          >
            <option value="Pemula">Pemula</option>
            <option value="Menengah">Menengah</option>
            <option value="Kompleks">Kompleks</option>
            <option value="Enterprise">Enterprise</option>
          </Select>
        </div>

        <Input
          label="Tag (pisahkan dengan koma)"
          placeholder="Contoh: React, Gojek, LMS, Firebase"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
        />

        <Textarea
          label="Isi Prompt Lengkap (Markdown)"
          value={fullPromptContent}
          onChange={(e) => setFullPromptContent(e.target.value)}
          rows={10}
          required
        />

        <div className="flex justify-end gap-2 pt-3 border-t border-neutral-100 dark:border-neutral-800">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsEditModalOpen(false)}
          >
            Batal
          </Button>
          <Button type="submit" className="font-bold">
            Simpan Perubahan
          </Button>
        </div>
      </form>
    </Modal>
  );
};
