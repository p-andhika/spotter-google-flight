import React from 'react';
import { Clock, Plane } from 'lucide-react';
import type { Flight } from '../types/flight';
import { format, parseISO } from 'date-fns';

interface FlightCardProps {
  flight: Flight;
}

export default function FlightCard({ flight }: FlightCardProps) {
  const { price, legs, tags = [] } = flight; // Provide default empty array for tags

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatDateTime = (dateStr: string) => {
    const date = parseISO(dateStr);
    return format(date, 'HH:mm, MMM d');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      {legs.map((leg, index) => (
        <div key={leg.id} className={index > 0 ? 'mt-4 pt-4 border-t' : ''}>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex-1">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                <div className="flex items-center gap-2">
                  <div className="flex flex-col items-start">
                    <span className="text-lg font-semibold">{leg.origin.displayCode}</span>
                    <span className="text-sm text-gray-500">{leg.origin.city}</span>
                  </div>
                  <Plane className="h-4 w-4 text-gray-400 rotate-90" />
                  <div className="flex flex-col items-start">
                    <span className="text-lg font-semibold">{leg.destination.displayCode}</span>
                    <span className="text-sm text-gray-500">{leg.destination.city}</span>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {formatDuration(leg.durationInMinutes)}
                  </div>
                  <div className="flex items-center gap-2">
                    {leg.carriers.marketing.map((carrier, i) => (
                      <div key={carrier.id} className="flex items-center gap-1">
                        {i > 0 && '+'}
                        <img src={carrier.logoUrl} alt={carrier.name} className="h-4 w-4" />
                        <span>{carrier.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-2 flex flex-col md:flex-row gap-4 text-sm">
                <div>
                  <div className="text-gray-600">Departure</div>
                  <div className="font-medium">{formatDateTime(leg.departure)}</div>
                </div>
                <div>
                  <div className="text-gray-600">Arrival</div>
                  <div className="font-medium">{formatDateTime(leg.arrival)}</div>
                </div>
                <div>
                  <div className="text-gray-600">Stops</div>
                  <div className="font-medium">
                    {leg.stopCount === 0 ? (
                      <span className="text-green-600">Direct</span>
                    ) : (
                      <span>{leg.stopCount} stop{leg.stopCount > 1 ? 's' : ''}</span>
                    )}
                  </div>
                </div>
              </div>

              {leg.segments.length > 1 && (
                <div className="mt-2">
                  <details className="text-sm">
                    <summary className="cursor-pointer text-blue-600 hover:text-blue-700">
                      View connection details
                    </summary>
                    <div className="mt-2 space-y-2">
                      {leg.segments.map((segment, i) => (
                        <div key={segment.id} className="pl-4 border-l-2 border-gray-200">
                          <div className="flex items-center gap-2">
                            <div className="flex flex-col">
                              <span className="font-medium">{segment.origin.displayCode} → {segment.destination.displayCode}</span>
                              <span className="text-gray-600">
                                {formatDateTime(segment.departure)} - {formatDateTime(segment.arrival)}
                              </span>
                            </div>
                          </div>
                          {i < leg.segments.length - 1 && (
                            <div className="my-2 text-orange-600">
                              {formatDuration(
                                (new Date(leg.segments[i + 1].departure).getTime() - 
                                new Date(segment.arrival).getTime()) / 60000
                              )} layover in {segment.destination.name}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </details>
                </div>
              )}
            </div>

            <div className="flex flex-col items-end">
              <div className="text-2xl font-bold text-blue-600">
                {price.formatted}
              </div>
              {tags.length > 0 && (
                <div className="mt-1">
                  {tags.includes('cheapest') && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Cheapest
                    </span>
                  )}
                  {tags.includes('shortest') && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Fastest
                    </span>
                  )}
                </div>
              )}
              <button className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Select
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}