
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Tables } from "@/integrations/supabase/types";

export type Analysis = Tables<"market_analysis">;

export const fetchAnalyses = async () => {
  const { data, error } = await supabase
    .from("market_analysis")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    toast({
      title: "Error fetching market analyses",
      description: error.message,
      variant: "destructive",
    });
    return [];
  }

  return data as Analysis[];
};

export const fetchAnalysisById = async (id: string) => {
  const { data, error } = await supabase
    .from("market_analysis")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    toast({
      title: "Error fetching market analysis",
      description: error.message,
      variant: "destructive",
    });
    return null;
  }

  return data as Analysis;
};

export const createAnalysis = async (analysis: Omit<Analysis, "id" | "created_at" | "updated_at">) => {
  const { data, error } = await supabase
    .from("market_analysis")
    .insert([analysis])
    .select()
    .single();

  if (error) {
    toast({
      title: "Error creating market analysis",
      description: error.message,
      variant: "destructive",
    });
    return null;
  }

  toast({
    title: "Market analysis created",
    description: "Your analysis has been successfully created.",
  });

  return data as Analysis;
};

export const updateAnalysis = async (id: string, updates: Partial<Analysis>) => {
  const { data, error } = await supabase
    .from("market_analysis")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    toast({
      title: "Error updating market analysis",
      description: error.message,
      variant: "destructive",
    });
    return null;
  }

  toast({
    title: "Market analysis updated",
    description: "Your analysis has been successfully updated.",
  });

  return data as Analysis;
};

export const deleteAnalysis = async (id: string) => {
  const { error } = await supabase
    .from("market_analysis")
    .delete()
    .eq("id", id);

  if (error) {
    toast({
      title: "Error deleting market analysis",
      description: error.message,
      variant: "destructive",
    });
    return false;
  }

  toast({
    title: "Market analysis deleted",
    description: "Your analysis has been successfully deleted.",
  });

  return true;
};
