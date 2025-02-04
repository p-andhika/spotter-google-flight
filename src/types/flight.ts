export interface Flight {
  id: string;
  price: {
    raw: number;
    formatted: string;
    pricingOptionId: string;
  };
  legs: {
    id: string;
    origin: {
      id: string;
      name: string;
      displayCode: string;
      city: string;
      country: string;
    };
    destination: {
      id: string;
      name: string;
      displayCode: string;
      city: string;
      country: string;
    };
    durationInMinutes: number;
    stopCount: number;
    departure: string;
    arrival: string;
    carriers: {
      marketing: {
        id: number;
        alternateId: string;
        logoUrl: string;
        name: string;
      }[];
      operating?: {
        id: number;
        alternateId: string;
        logoUrl: string;
        name: string;
      }[];
      operationType: string;
    };
    segments: {
      id: string;
      origin: {
        flightPlaceId: string;
        displayCode: string;
        name: string;
        type: string;
        country: string;
      };
      destination: {
        flightPlaceId: string;
        displayCode: string;
        name: string;
        type: string;
        country: string;
      };
      departure: string;
      arrival: string;
      durationInMinutes: number;
      flightNumber: string;
      marketingCarrier: {
        id: number;
        name: string;
        alternateId: string;
      };
      operatingCarrier: {
        id: number;
        name: string;
        alternateId: string;
      };
    }[];
  }[];
  isSelfTransfer: boolean;
  isProtectedSelfTransfer: boolean;
  farePolicy: {
    isChangeAllowed: boolean;
    isPartiallyChangeable: boolean;
    isCancellationAllowed: boolean;
    isPartiallyRefundable: boolean;
  };
  tags: string[];
}