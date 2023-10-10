import styled from "styled-components";
import { useFilterContext } from "../context/filter_context";
import { FaCheck } from "react-icons/fa";
import FormatPrice from "../Helpers/FormatPrice";
import { Button } from "../styles/Button";
import { useState,useEffect } from "react";

const FilterSection = () => {
  const {
    filters: { text, category, price,egg, maxPrice, minPrice },
        updateFilterValue,
        all_products,
        clearFilters,
      } = useFilterContext();

  // get the unique values of each property
  const getUniqueData = (data, attr) => {
    let newVal;
    if(attr==="category"){
     newVal = data.map((curElem) => {
      return (curElem.category+"").toLowerCase()
    });
    return newVal=["all",...new Set(newVal)];
    }
    else{
      newVal = data.flatMap((curElem) => {
        return (curElem.flavours)});
      newVal= newVal.map((cake)=>cake.toLowerCase())
    return newVal=["all",...new Set(newVal)];
   }
  };
 

  // we need to have the individual data of each in an array format
  const categoryData = getUniqueData(all_products, "category");
  const flavoursData = getUniqueData(all_products, "flavours");
  
  return (
    <Wrapper>
      <div className="filter-search">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            name="text"
            placeholder="Search"
            value={text}
            onChange={updateFilterValue}
          />
        </form>
      </div>

      <div className="filter-category">
        <h3>Category </h3>
        <div>
          {categoryData.map((curElem, index) => {
            return (
              <button
                key={index}
                type="button"
                name="category"
                value={curElem}
                className={curElem === category ? "active" : ""}
                onClick={updateFilterValue}>
                {curElem}
              </button>
            );
          })}
        </div>
      </div>

      <div className="filter-flavour">
        <h3>Flavours:</h3>

        
          <select
            name="flavour"
            id="flavour"
            className="filter-flavour--select"
            onClick={updateFilterValue}
              onChange={updateFilterValue }
              onBlur={updateFilterValue}
              >
            {flavoursData.map((curElem, index) => {
              return (
                <option key={index} value={curElem} name="flavour">
                  {curElem}
                </option>
              );
            })}
          </select>

      </div>
      {/* for egg */}
      <div className="filter-category">
      <h3>Egg:</h3>
      <select
            name="egg"
            id="egg"
            className="filter-flavour--select"
            onClick={updateFilterValue}
              onChange={updateFilterValue }
              onBlur={updateFilterValue}
              >
                <option name="egg">all</option>
            <option name="egg">Egg</option>
            <option name="egg">Eggless</option>
          </select>
      </div>

      <div className="filter_price">
        <h3>Price</h3>
        <p>
          <FormatPrice price={price} />
        </p>
        <input
          type="range"
          name="price"
          min={minPrice}
          max={maxPrice}
          value={price}
          onChange={updateFilterValue}
        />
      </div>

      <div className="filter-clear">
        <Button className="btn" onClick={clearFilters}>
          Clear Filters
        </Button>
      </div>

    
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  h3 {
    padding: 2rem 0;
    font-size: bold;
  }

  .filter-search {
    input {
      padding: 0.6rem 1rem;
      width: 80%;
    }
  }

  .filter-category {
    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1.4rem;

      button {
        border: none;
        background-color: ${({ theme }) => theme.colors.white};
        text-transform: capitalize;
        cursor: pointer;

        &:hover {
          color: ${({ theme }) => theme.colors.btn};
        }
      }

      .active {
        border-bottom: 1px solid #000;
        color: ${({ theme }) => theme.colors.btn};
        outline: none;
      }
    }
  }

  .filter-flavour--select {
    padding: 0.3rem 1.2rem;
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.text};
    text-transform: capitalize;
  }

  .filter-flavour-style {
    display: flex;
    justify-content: center;
  }

  .flavour-all--style {
    background-color: transparent;
    text-transform: capitalize;
    border: none;
    cursor: pointer;
  }
  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  .active {
    opacity: 1;
  }

  .checkStyle {
    font-size: 1rem;
    color: #fff;
  }

  .filter_price {
    input {
      margin: 0.5rem 0 1rem 0;
      padding: 0;
      box-shadow: none;
      cursor: pointer;
    }
  }

  .filter-shipping {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .filter-clear .btn {
    background-color: #ec7063;
    color: #000;
  }
`;

export default FilterSection;