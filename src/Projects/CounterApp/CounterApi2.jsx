import { useState, useEffect } from 'react';
import { Plus, Minus, Trash } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const API_URL = 'https://api.example.com/counter'; // Replace with your actual API endpoint

const Counter = () => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch initial counter value
  useEffect(() => {
    fetchCounter();
  }, []);

  const fetchCounter = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      const data = await response.json();
      setCount(data.value);
      setError(null);
    } catch (err) {
      setError('Failed to fetch counter');
    } finally {
      setLoading(false);
    }
  };

  const createCounter = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value: 0 }),
      });
      const data = await response.json();
      setCount(data.value);
      setError(null);
    } catch (err) {
      setError('Failed to create counter');
    } finally {
      setLoading(false);
    }
  };

  const updateCounter = async (increment) => {
    try {
      setLoading(true);
      const response = await fetch(API_URL, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value: count + increment }),
      });
      const data = await response.json();
      setCount(data.value);
      setError(null);
    } catch (err) {
      setError('Failed to update counter');
    } finally {
      setLoading(false);
    }
  };

  const deleteCounter = async () => {
    try {
      setLoading(true);
      await fetch(API_URL, {
        method: 'DELETE',
      });
      setCount(0);
      setError(null);
    } catch (err) {
      setError('Failed to delete counter');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Counter with API Operations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <div className="flex items-center justify-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => updateCounter(-1)}
            disabled={loading}
          >
            <Minus className="h-4 w-4" />
          </Button>
          
          <div className="text-4xl font-bold min-w-[3ch] text-center">
            {loading ? '...' : count}
          </div>
          
          <Button
            variant="outline"
            size="icon"
            onClick={() => updateCounter(1)}
            disabled={loading}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex justify-center space-x-2">
          <Button
            variant="secondary"
            onClick={createCounter}
            disabled={loading}
          >
            Reset
          </Button>
          
          <Button
            variant="destructive"
            onClick={deleteCounter}
            disabled={loading}
          >
            <Trash className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Counter;