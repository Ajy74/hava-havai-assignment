import postgres from "../db/dbconnect.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/apiError.js"; 

const createTables = asyncHandler(async (req, res) => {
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
                elevation_ft INTEGER NOT NULL,
                wikipedia_link VARCHAR(255)
            );
        `);

      
        return res
        .status(200)
        .json(new ApiResponse(200, {}, "Tables created successfully !!"));
    } catch (error) {
        throw new ApiError(
            500,
            error
        );
    }
});


const addData = asyncHandler(async (req, res) => {
    try {
       
        return res
        .status(200)
        .json(new ApiResponse(200, {}, "Data Added successfully !!"));
    } catch (error) {
        throw new ApiError(
            500,
            error
        );
    }
});



export { createTables, addData }
