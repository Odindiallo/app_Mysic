'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { PlanService } from '@/services/plan-service';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export function OrderRecovery() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState<{ id: string; planName: string; price: number }[]>([]);
  const { toast } = useToast();
  const router = useRouter();

  const handleRecovery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      const recoveredOrders = await PlanService.recoverOrder(email);
      setOrders(recoveredOrders);
      
      if (recoveredOrders.length === 0) {
        toast({
          title: 'No orders found',
          description: 'We couldn\'t find any incomplete orders for this email address.',
          variant: 'default',
        });
      }
    } catch (error) {
      console.error('Recovery error:', error);
      toast({
        title: 'Error',
        description: 'Failed to recover orders. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resumeOrder = (orderId: string) => {
    router.push(`/payment?order_id=${orderId}`);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Resume Your Order</CardTitle>
        <CardDescription>
          Enter your email to find and continue your incomplete orders
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleRecovery} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? 'Searching...' : 'Find Orders'}
          </Button>
        </form>

        {orders.length > 0 && (
          <div className="mt-6 space-y-4">
            <h3 className="text-sm font-medium">Found Orders:</h3>
            {orders.map((order) => (
              <div
                key={order.id}
                className="p-4 border rounded-lg space-y-2"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{order.planName}</p>
                    <p className="text-sm text-gray-500">${order.price}</p>
                  </div>
                  <Button
                    onClick={() => resumeOrder(order.id)}
                    variant="secondary"
                  >
                    Resume
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="text-sm text-gray-500">
        Orders are available for 24 hours after creation
      </CardFooter>
    </Card>
  );
}
