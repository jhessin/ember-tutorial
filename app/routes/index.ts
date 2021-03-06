import Route from '@ember/routing/route';

const COMMUNITY_CATEGORIES = ['Condo', 'Townhouse', 'Apartment'];

interface iModel {
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

interface iData {
  data: iModel[];
}

export interface iProperty {
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

export default class IndexRoute extends Route {
  async model(): Promise<iProperty[]> {
    let res = await fetch('/api/rentals.json');
    let parsed: iData = await res.json();
    const { data } = parsed;

    return data.map((model) => {
      let { id, attributes } = model;
      let type = COMMUNITY_CATEGORIES.includes(attributes.category)
        ? 'Community'
        : 'Standalone';

      return { id, type, ...attributes };
    });
  }
}
