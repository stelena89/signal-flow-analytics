import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
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
import { createSignal } from "@/services/signalService";
import { toast } from "@/components/ui/use-toast";

const timeframes = ["Weekly", "Daily", "4 Hour", "1 Hour", "15 Min"];

type SignalFormValues = {
  pair: string;
  type: string;
  entry: string;
  stop_loss: string;
  take_profit: string;
  timeframe: string;
  status: string;
};

interface SignalFormProps {
  defaultValues?: Partial<SignalFormValues>;
  onSubmit?: (data: SignalFormValues) => Promise<void>;
  submitLabel?: string;
}

export default function SignalForm({
  defaultValues,
  onSubmit,
  submitLabel,
}: SignalFormProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SignalFormValues>({
    defaultValues: {
      pair: "",
      type: "BUY",
      entry: "",
      stop_loss: "",
      take_profit: "",
      timeframe: "Daily",
      status: "ACTIVE",
      ...defaultValues,
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset({ ...form.getValues(), ...defaultValues });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues]);

  const handleSubmit = async (data: SignalFormValues) => {
    if (onSubmit) {
      setIsSubmitting(true);
      await onSubmit(data);
      setIsSubmitting(false);
      return;
    }

    if (!user) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to create a signal",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const signalData = {
        pair: data.pair,
        type: data.type,
        entry: data.entry,
        stop_loss: data.stop_loss,
        take_profit: data.take_profit,
        timeframe: data.timeframe,
        status: data.status,
        user_id: user.id,
        date: new Date().toISOString(),
        pips: null,
      };

      const result = await createSignal(signalData);

      if (result) {
        toast({
          title: "Signal Created",
          description: "Your trading signal has been successfully created",
        });
        navigate("/signals");
      }
    } catch (error) {
      console.error("Error submitting signal:", error);
      toast({
        title: "Error",
        description: "There was an error creating your signal",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">
        {submitLabel ? submitLabel : "Create Trading Signal"}
      </h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Signal Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select signal type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="BUY">BUY</SelectItem>
                      <SelectItem value="SELL">SELL</SelectItem>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="entry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Entry</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 1.0950" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stop_loss"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stop Loss</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 1.0900" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="take_profit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Take Profit</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 1.1000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                    <SelectItem value="TP HIT">TP HIT</SelectItem>
                    <SelectItem value="SL HIT">SL HIT</SelectItem>
                    <SelectItem value="CLOSED">CLOSED</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end space-x-4 pt-4">
            <Button variant="outline" type="button" onClick={() => navigate("/signals")}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (submitLabel ? "Saving..." : "Creating...") : (submitLabel ?? "Create Signal")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
