import React, { useState } from 'react';
import { Plane } from 'lucide-react';
import SearchForm from './components/SearchForm';
import FlightCard from './components/FlightCard';
import { searchFlights } from './services/api';
import type { Flight } from './types/flight';

function App() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (from: string, to: string, date: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const results = await searchFlights(from, to, date);
      setFlights(results);
    } catch (err) {
      setError('Failed to fetch flights. Please try again.');
      setFlights([]);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2">
            <Plane className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Flight Search</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchForm onSearch={handleSearch} isLoading={isLoading} />

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        <div className="mt-8 space-y-6">
          {isLoading ? (
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-r-transparent"></div>
              <p className="mt-2 text-gray-600">Searching for flights...</p>
            </div>
          ) : flights.length > 0 ? (
            flights.map((flight) => (
              <FlightCard key={flight.id} flight={flight} />
            ))
          ) : !error && (
            <p className="text-center text-gray-600">
              Search for flights to see results here
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
