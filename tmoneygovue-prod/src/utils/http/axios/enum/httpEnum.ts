/**
 * @description: Request result set
 */
export enum DefaultResultEnum {
  SUCCESS = '200'
}

export enum DefaultResultDtaEnum {
  SUCCESS = '0000'
}

export enum TravelResultCodeEnum {
  SUCCESS = 200
}

export enum TravelErorCodeEnum {
  SUCCESS = '00000'
}

export enum MobilityResultCodeEnum {
  SUCCESS = 200
}

export enum MobilityErorCodeEnum {
  SUCCESS = '0000'
}

export enum OndataxiResultCodeEnum {
  SUCCESS = 'S0000'
}

/**
 * @description: request method
 */
export enum RequestEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

/**
 * @description:  contentType
 */
export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // form-data qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  upload
  FORM_DATA = 'multipart/form-data;charset=UTF-8'
}
