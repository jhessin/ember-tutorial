import Route from '@ember/routing/route';

const COMMUNITY_CATEGORIES = ['Condo', 'Townhouse', 'Apartment'];

interface iData {
  type: string;
  id: string;
  attributes: {
    title: string;
    owner: string;
    city: string;
    location: {
      lat: number;
      lng: number;
    };
    category: string;
    bedrooms: number;
    image: string;
    description: string;
  };
}

interface iJson {
  data: iData;
}

export interface iModel {
  type: string;
  id: string;
  title: string;
  owner: string;
  city: string;
  location: {
    lat: number;
    lng: number;
  };
  category: string;
  bedrooms: number;
  image: string;
  description: string;
}

export default class RentalRoute extends Route {
  async model(params: { rental_id: string }): Promise<iModel> {
    let res = await fetch(`/api/rentals/${params.rental_id}.json`);
    let { data }: iJson = await res.json();

    let { id, attributes } = data;
    let type = COMMUNITY_CATEGORIES.includes(attributes.category)
      ? 'Community'
      : 'Standalone';

    return { id, type, ...attributes };
  }
}
