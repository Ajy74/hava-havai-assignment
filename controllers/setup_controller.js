import postgres from "../db/dbconnect.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/apiError.js"; 
import fs from 'fs';
import csv from 'csv-parser';

const countryCsv = './public/Database_country.csv';
const cityCsv = './public/Database_city.csv';
const airportCsv = './public/Database_airport.csv';

const createTables = asyncHandler(async (req, res) => {
    // const postgres = await getClient();

    try {
        await postgres.query(`
            CREATE TABLE IF NOT EXISTS Country (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                alt_name VARCHAR(255),
                country_code_two VARCHAR(2) NOT NULL,
                country_code_three VARCHAR(3) NOT NULL,
                flag_app VARCHAR(255),
                mobile_code INTEGER NOT NULL,
                continent_id INTEGER NOT NULL,
                country_flag VARCHAR(255)
            );

            CREATE TABLE IF NOT EXISTS City (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                alt_name VARCHAR(255),
                country_id INTEGER REFERENCES Country(id),
                is_active BOOLEAN NOT NULL,
                created_at TIMESTAMP NOT NULL,
                updated_at TIMESTAMP NOT NULL,
                lat FLOAT NOT NULL,
                long FLOAT NOT NULL
            );
        
            CREATE TABLE IF NOT EXISTS Airport (
                id SERIAL PRIMARY KEY,
                icao_code VARCHAR(4) NOT NULL,
                iata_code VARCHAR(3) NOT NULL,
                name VARCHAR(255) NOT NULL,
                type VARCHAR(50) NOT NULL,
                city_id INTEGER REFERENCES City(id),
                country_id INTEGER REFERENCES Country(id),
                continent_id INTEGER NOT NULL,
                website_url VARCHAR(255),
                created_at TIMESTAMP NOT NULL,
                updated_at TIMESTAMP NOT NULL,
                latitude_deg FLOAT NOT NULL,
                longitude_deg FLOAT NOT NULL,
                elevation_ft INTEGER,
                wikipedia_link VARCHAR(255)
            );
        `);

        // postgres.end();

        return res
        .status(200)
        .json(new ApiResponse(200, {}, "Tables created successfully !!"));
    } catch (error) {
        // postgres.end();

        throw new ApiError(
            500,
            error
        );
    }
});


const loadCSVData = async (filePath, table, columns) => {
    return new Promise(async (resolve, reject) => {

      //~ Fetch valid city and country IDs
    //   const validCityIds = (await postgres.query('SELECT id FROM City')).rows.map(row => row.id);
    //   const validCountryIds = (await postgres.query('SELECT id FROM Country')).rows.map(row => row.id);

      const results = [];
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
          try {
            var count = 0;
            for (const row of results) {
                // if(count > 400){
                //     break ;
                // }

                // const cityId = parseInt(row['city_id']);
                // const countryId = parseInt(row['country_id']);
                
             
                // if (validCityIds.includes(cityId) && validCountryIds.includes(countryId)) {
                  const values = columns.map(column => {
                    let value = row[column].trim();
                    if (value === 'NULL' || value === '') return "NULL";
                    if (column === 'is_active') return value === 'TRUE';
                    if (column === 'created_at' || column === 'updated_at') return `'${new Date(value).toISOString()}'`;
                    if (column === 'id' || column === 'country_id' || column === 'mobile_code' || column === 'continent_id' || column === 'city_id' || column === 'elevation_ft') return parseInt(value); 
                    if (column === 'lat' || column === 'long' || column === 'latitude_deg' || column === 'longitude_deg') return parseFloat(value);
                    return `'${value}'`;
                  }).join(', ');
  
                  console.log(columns.join(', ')+" >><< "+values+"\n");
                  await postgres.query(`INSERT INTO ${table} (${columns.join(', ')}) VALUES (${values});`);
                // }
                

                // count = count+1;
            }

            resolve();
          } catch (error) {
            reject(error);
          }
        });
    });
};


const addData = asyncHandler(async (req, res) => {
    // const postgres = await getClient();

    try {
        // await loadCSVData(countryCsv, 'Country', [
        //     'id', 'name', 'alt_name', 'country_code_two', 'country_code_three', 'flag_app', 'mobile_code', 'continent_id', 'country_flag'
        //   ]
        // );
        
        // await loadCSVData(cityCsv, 'City', [
        //     'id', 'name', 'alt_name', 'country_id', 'is_active', 'created_at', 'updated_at', 'lat', 'long'
        //   ]
        // );

        // await loadCSVData(airportCsv, 'Airport', [
        //     'id', 'icao_code', 'iata_code', 'name', 'type', 'city_id', 'country_id', 'continent_id', 'website_url', 'created_at', 'updated_at', 'latitude_deg', 'longitude_deg', 'elevation_ft', 'wikipedia_link'
        //   ]
        // );

        // postgres.end();

        return res
        .status(200)
        .json(new ApiResponse(200, {}, "Data Added successfully !!"));
    } catch (error) {
        // postgres.end();

        throw new ApiError(
            500,
            "Something went wrong while adding data !!",
            error
        );
    } 
});



export { createTables, addData }
