
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Tables } from "@/integrations/supabase/types";

export type Signal = Tables<"trading_signals">;

export const fetchSignals = async () => {
  const { data, error } = await supabase
    .from("trading_signals")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    toast({
      title: "Error fetching signals",
      description: error.message,
      variant: "destructive",
    });
    return [];
  }

  return data as Signal[];
};

export const fetchSignalById = async (id: string) => {
  const { data, error } = await supabase
    .from("trading_signals")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    toast({
      title: "Error fetching signal",
      description: error.message,
      variant: "destructive",
    });
    return null;
  }

  return data as Signal;
};

export const createSignal = async (signal: Omit<Signal, "id" | "created_at" | "updated_at">) => {
  const { data, error } = await supabase
    .from("trading_signals")
    .insert([signal])
    .select()
    .single();

  if (error) {
    toast({
      title: "Error creating signal",
      description: error.message,
      variant: "destructive",
    });
    return null;
  }

  toast({
    title: "Signal created",
    description: "Your signal has been successfully created.",
  });

  return data as Signal;
};

export const updateSignal = async (id: string, updates: Partial<Signal>) => {
  const { data, error } = await supabase
    .from("trading_signals")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    toast({
      title: "Error updating signal",
      description: error.message,
      variant: "destructive",
    });
    return null;
  }

  toast({
    title: "Signal updated",
    description: "Your signal has been successfully updated.",
  });

  return data as Signal;
};

export const deleteSignal = async (id: string) => {
  const { error } = await supabase
    .from("trading_signals")
    .delete()
    .eq("id", id);

  if (error) {
    toast({
      title: "Error deleting signal",
      description: error.message,
      variant: "destructive",
    });
    return false;
  }

  toast({
    title: "Signal deleted",
    description: "Your signal has been successfully deleted.",
  });

  return true;
};
