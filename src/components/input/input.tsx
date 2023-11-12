import React, { useState, useEffect } from 'react';
import { getSearchProduct } from 'src/services/product.service';
import { Card, TCard } from '../card';
import css from './input.module.scss'
import _ from 'lodash';

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<TCard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false)


  useEffect(() => {
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);

    getSearchProduct(searchTerm)
      .then((response: any) => {
        setSearchResults(response.content);
        setIsLoading(false);
      })
      .catch((error: any) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, [searchTerm]);

  const handleSearchClick = () => {
    setIsSearching(true);
  };

  // SẮP XẾP
  const sortProducts = (products: TCard[], sortOrder: 'asc' | 'desc') => {
    const sorted = _.orderBy(products, ['price'], [sortOrder]);
    setSearchResults(sorted);
  };


  return (
    <div className={css['container']}>
      <input className={css['input-search']}
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className={css['button-search']} onClick={handleSearchClick}>Search</button>

      <div className={css['button-sort']}>
        <button className={css['button-asc']} onClick={() => sortProducts(searchResults, 'asc')}>Sắp xếp giá tăng dần</button>
        <br />
        <button className={css['button-desc']} onClick={() => sortProducts(searchResults, 'desc')}>Sắp xếp giá giảm dần</button>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className={css['list-card']}>
          {isSearching && searchResults && searchResults.map((product) => {
            return <div className={css['card-container']}>
              <Card key={product.id} data={product} />
            </div>
          })}
        </div>
      )}

    </div>
  );
};

export default SearchInput;
