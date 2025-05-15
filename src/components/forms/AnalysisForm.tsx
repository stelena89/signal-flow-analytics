
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { createAnalysis } from "@/services/analysisService";
import { toast } from "@/components/ui/use-toast";

const timeframes = ["Weekly", "Daily", "4 Hour", "1 Hour", "15 Min"];
const assetTypes = ["forex", "crypto", "stocks", "commodities"];

type AnalysisFormValues = {
  title: string;
  pair: string;
  summary: string;
  content: string;
  timeframe: string;
  asset_type: string;
  tags: string;
};

export default function AnalysisForm() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AnalysisFormValues>({
    defaultValues: {
      title: "",
      pair: "",
      summary: "",
      content: "",
      timeframe: "Daily",
      asset_type: "forex",
      tags: "",
    },
  });

  const onSubmit = async (data: AnalysisFormValues) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to create an analysis",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Convert tags string to array
      const tagsArray = data.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");

      const analysisData = {
        title: data.title,
        pair: data.pair,
        summary: data.summary,
        content: data.content,
        timeframe: data.timeframe,
        asset_type: data.asset_type,
        tags: tagsArray,
        author: user.email || "Anonymous",
        user_id: user.id,
        date: new Date().toISOString().split('T')[0], // Format as YYYY-MM-DD
      };

      const result = await createAnalysis(analysisData);
      
      if (result) {
        toast({
          title: "Analysis Created",
          description: "Your market analysis has been successfully created",
        });
        navigate("/analysis");
      }
    } catch (error) {
      console.error("Error submitting analysis:", error);
      toast({
        title: "Error",
        description: "There was an error creating your analysis",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Create Market Analysis</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Analysis title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pair"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trading Pair</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. EUR/USD, BTC/USD" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="asset_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Asset Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select asset type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {assetTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="timeframe"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Timeframe</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select timeframe" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {timeframes.map((timeframe) => (
                        <SelectItem key={timeframe} value={timeframe}>
                          {timeframe}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Summary</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Brief summary of your analysis" 
                    className="h-20"
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  A short summary that will be displayed in the analysis list
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Analysis</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Your detailed market analysis..." 
                    className="h-60"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <Input placeholder="trend, breakout, support (comma separated)" {...field} />
                </FormControl>
                <FormDescription>
                  Separate tags with commas
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end space-x-4 pt-4">
            <Button variant="outline" type="button" onClick={() => navigate("/analysis")}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Analysis"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
