import { useState, useEffect } from 'react';
import { Plus, Minus, Trash, RefreshCw, Save } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const API_URL = 'https://api.example.com/metrics';

const Counter = () => {
  const [data, setData] = useState({
    likes: 0,
    shares: 0
  });
  const [editMode, setEditMode] = useState({
    likes: false,
    shares: false
  });
  const [editValue, setEditValue] = useState({
    likes: '',
    shares: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      const jsonData = await response.json();
      setData(jsonData);
      setError(null);
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  // PATCH - Update specific field
  const updateField = async (field, increment) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/${field}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          [field]: data[field] + increment
        }),
      });
      const updatedData = await response.json();
      setData(updatedData);
      setError(null);
    } catch (err) {
      setError(`Failed to update ${field}`);
    } finally {
      setLoading(false);
    }
  };

  // PUT - Replace specific field value
  const putField = async (field) => {
    const newValue = parseInt(editValue[field], 10);
    if (isNaN(newValue)) {
      setError(`Invalid value for ${field}`);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/${field}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          [field]: newValue
        }),
      });
      const updatedData = await response.json();
      setData(updatedData);
      setEditMode(prev => ({ ...prev, [field]: false }));
      setError(null);
    } catch (err) {
      setError(`Failed to update ${field}`);
    } finally {
      setLoading(false);
    }
  };

  // DELETE specific field
  const deleteField = async (field) => {
    try {
      setLoading(true);
      await fetch(`${API_URL}/${field}`, {
        method: 'DELETE',
      });
      setData(prev => ({
        ...prev,
        [field]: 0
      }));
      setError(null);
    } catch (err) {
      setError(`Failed to delete ${field}`);
    } finally {
      setLoading(false);
    }
  };

  // Reset all
  const resetAll = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          likes: 0,
          shares: 0
        }),
      });
      const newData = await response.json();
      setData(newData);
      setError(null);
    } catch (err) {
      setError('Failed to reset counters');
    } finally {
      setLoading(false);
    }
  };

  const CounterSection = ({ field, value }) => (
    <div className="space-y-2 p-4 border rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium capitalize">{field}</h3>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setEditMode(prev => ({ ...prev, [field]: true }));
              setEditValue(prev => ({ ...prev, [field]: value.toString() }));
            }}
            disabled={loading || editMode[field]}
          >
            <Save className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => deleteField(field)}
            disabled={loading}
            className="text-red-500 hover:text-red-700 hover:bg-red-100"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {editMode[field] ? (
        <div className="flex items-center space-x-2">
          <Input
            type="number"
            value={editValue[field]}
            onChange={(e) => setEditValue(prev => ({
              ...prev,
              [field]: e.target.value
            }))}
            className="w-24"
          />
          <Button
            variant="outline"
            onClick={() => putField(field)}
            disabled={loading}
          >
            Save
          </Button>
          <Button
            variant="ghost"
            onClick={() => setEditMode(prev => ({ ...prev, [field]: false }))}
            disabled={loading}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => updateField(field, -1)}
            disabled={loading}
          >
            <Minus className="h-4 w-4" />
          </Button>
          
          <div className="text-4xl font-bold min-w-[3ch] text-center">
            {loading ? '...' : value}
          </div>
          
          <Button
            variant="outline"
            size="icon"
            onClick={() => updateField(field, 1)}
            disabled={loading}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Social Metrics Counter</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <CounterSection field="likes" value={data.likes} />
        <CounterSection field="shares" value={data.shares} />

        <div className="flex justify-center space-x-2">
          <Button
            variant="secondary"
            onClick={resetAll}
            disabled={loading}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset All
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Counter;