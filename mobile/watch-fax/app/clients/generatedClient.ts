//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v14.4.0.0 (NJsonSchema v11.3.2.0 (Newtonsoft.Json v13.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming

export default class Client {
    private http: {
        fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
    };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined =
        undefined;

    constructor(
        baseUrl?: string,
        http?: {
            fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
        }
    ) {
        this.http = http ? http : (window as any);
        this.baseUrl = baseUrl ?? '';
    }

    /**
     * @param brand (optional)
     * @param model (optional)
     * @param referenceNumber (optional)
     * @param serialNumber (optional)
     * @param productionYear (optional)
     * @param purchaseDate (optional)
     * @param purchasePrice (optional)
     * @param hasPapers (optional)
     * @param hasBox (optional)
     * @param hasRecordOfAuthentication (optional)
     * @param descriptionOfCondition (optional)
     * @param story (optional)
     * @param images (optional)
     * @return Success
     */
    createWatch(
        brand: string | undefined,
        model: string | undefined,
        referenceNumber: string | undefined,
        serialNumber: string | undefined,
        productionYear: number | undefined,
        purchaseDate: number | undefined,
        purchasePrice: number | undefined,
        hasPapers: boolean | undefined,
        hasBox: boolean | undefined,
        hasRecordOfAuthentication: boolean | undefined,
        descriptionOfCondition: string | undefined,
        story: string | undefined,
        images: FileParameter[] | undefined
    ): Promise<WatchRecord> {
        let url_ = this.baseUrl + '/api/v1/UserCollections';
        url_ = url_.replace(/[?&]$/, '');

        const content_ = new FormData();
        if (brand === null || brand === undefined)
            throw new Error("The parameter 'brand' cannot be null.");
        else content_.append('Brand', brand.toString());
        if (model === null || model === undefined)
            throw new Error("The parameter 'model' cannot be null.");
        else content_.append('Model', model.toString());
        if (referenceNumber === null || referenceNumber === undefined)
            throw new Error("The parameter 'referenceNumber' cannot be null.");
        else content_.append('ReferenceNumber', referenceNumber.toString());
        if (serialNumber === null || serialNumber === undefined)
            throw new Error("The parameter 'serialNumber' cannot be null.");
        else content_.append('SerialNumber', serialNumber.toString());
        if (productionYear === null || productionYear === undefined)
            throw new Error("The parameter 'productionYear' cannot be null.");
        else content_.append('ProductionYear', productionYear.toString());
        if (purchaseDate === null || purchaseDate === undefined)
            throw new Error("The parameter 'purchaseDate' cannot be null.");
        else content_.append('PurchaseDate', purchaseDate.toString());
        if (purchasePrice === null || purchasePrice === undefined)
            throw new Error("The parameter 'purchasePrice' cannot be null.");
        else content_.append('PurchasePrice', purchasePrice.toString());
        if (hasPapers === null || hasPapers === undefined)
            throw new Error("The parameter 'hasPapers' cannot be null.");
        else content_.append('HasPapers', hasPapers.toString());
        if (hasBox === null || hasBox === undefined)
            throw new Error("The parameter 'hasBox' cannot be null.");
        else content_.append('HasBox', hasBox.toString());
        if (
            hasRecordOfAuthentication === null ||
            hasRecordOfAuthentication === undefined
        )
            throw new Error(
                "The parameter 'hasRecordOfAuthentication' cannot be null."
            );
        else
            content_.append(
                'HasRecordOfAuthentication',
                hasRecordOfAuthentication.toString()
            );
        if (
            descriptionOfCondition === null ||
            descriptionOfCondition === undefined
        )
            throw new Error(
                "The parameter 'descriptionOfCondition' cannot be null."
            );
        else
            content_.append(
                'DescriptionOfCondition',
                descriptionOfCondition.toString()
            );
        if (story === null || story === undefined)
            throw new Error("The parameter 'story' cannot be null.");
        else content_.append('Story', story.toString());
        if (images === null || images === undefined)
            throw new Error("The parameter 'images' cannot be null.");
        else
            images.forEach((item_) =>
                content_.append(
                    'Images',
                    item_.data,
                    item_.fileName ? item_.fileName : 'Images'
                )
            );

        let options_: RequestInit = {
            body: content_,
            method: 'POST',
            headers: {
                Accept: 'text/plain',
            },
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processCreateWatch(_response);
        });
    }

    protected processCreateWatch(response: Response): Promise<WatchRecord> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && response.headers.forEach) {
            response.headers.forEach((v: any, k: any) => (_headers[k] = v));
        }
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                let resultData200 =
                    _responseText === ''
                        ? null
                        : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = WatchRecord.fromJS(resultData200);
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException(
                    'An unexpected server error occurred.',
                    status,
                    _responseText,
                    _headers
                );
            });
        }
        return Promise.resolve<WatchRecord>(null as any);
    }

    /**
     * @return Success
     */
    getAllWatchRecords(): Promise<WatchRecord[]> {
        let url_ = this.baseUrl + '/api/v1/UserCollections';
        url_ = url_.replace(/[?&]$/, '');

        let options_: RequestInit = {
            method: 'GET',
            headers: {
                Accept: 'text/plain',
            },
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetAllWatchRecords(_response);
        });
    }

    protected processGetAllWatchRecords(
        response: Response
    ): Promise<WatchRecord[]> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && response.headers.forEach) {
            response.headers.forEach((v: any, k: any) => (_headers[k] = v));
        }
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                let resultData200 =
                    _responseText === ''
                        ? null
                        : JSON.parse(_responseText, this.jsonParseReviver);
                if (Array.isArray(resultData200)) {
                    result200 = [] as any;
                    for (let item of resultData200)
                        result200!.push(WatchRecord.fromJS(item));
                } else {
                    result200 = <any>null;
                }
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException(
                    'An unexpected server error occurred.',
                    status,
                    _responseText,
                    _headers
                );
            });
        }
        return Promise.resolve<WatchRecord[]>(null as any);
    }

    /**
     * @return Success
     */
    getWatchById(id: string): Promise<WatchRecord> {
        let url_ = this.baseUrl + '/api/v1/UserCollections/{id}';
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace('{id}', encodeURIComponent('' + id));
        url_ = url_.replace(/[?&]$/, '');

        let options_: RequestInit = {
            method: 'GET',
            headers: {
                Accept: 'text/plain',
            },
        };
        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetWatchById(_response);
        });
    }

    protected processGetWatchById(response: Response): Promise<WatchRecord> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && response.headers.forEach) {
            response.headers.forEach((v: any, k: any) => (_headers[k] = v));
        }
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                let resultData200 =
                    _responseText === ''
                        ? null
                        : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = WatchRecord.fromJS(resultData200);
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException(
                    'An unexpected server error occurred.',
                    status,
                    _responseText,
                    _headers
                );
            });
        }
        return Promise.resolve<WatchRecord>(null as any);
    }
}

export class WatchRecord implements IWatchRecord {
    id?: string | undefined;
    userId?: string | undefined;
    brand?: string | undefined;
    model?: string | undefined;
    referenceNumber?: string | undefined;
    serialNumber?: string | undefined;
    productionYear?: number | undefined;
    purchaseDate?: number | undefined;
    purchasePrice?: number | undefined;
    hasPapers?: boolean | undefined;
    hasBox?: boolean | undefined;
    hasRecordOfAuthentication?: boolean | undefined;
    descriptionOfCondition?: string | undefined;
    story?: string | undefined;
    imageUrls?: string[] | undefined;
    createdAtTime?: number;

    constructor(data?: IWatchRecord) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data['id'];
            this.userId = _data['userId'];
            this.brand = _data['brand'];
            this.model = _data['model'];
            this.referenceNumber = _data['referenceNumber'];
            this.serialNumber = _data['serialNumber'];
            this.productionYear = _data['productionYear'];
            this.purchaseDate = _data['purchaseDate'];
            this.purchasePrice = _data['purchasePrice'];
            this.hasPapers = _data['hasPapers'];
            this.hasBox = _data['hasBox'];
            this.hasRecordOfAuthentication = _data['hasRecordOfAuthentication'];
            this.descriptionOfCondition = _data['descriptionOfCondition'];
            this.story = _data['story'];
            if (Array.isArray(_data['imageUrls'])) {
                this.imageUrls = [] as any;
                for (let item of _data['imageUrls']) this.imageUrls!.push(item);
            }
            this.createdAtTime = _data['createdAtTime'];
        }
    }

    static fromJS(data: any): WatchRecord {
        data = typeof data === 'object' ? data : {};
        let result = new WatchRecord();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['id'] = this.id;
        data['userId'] = this.userId;
        data['brand'] = this.brand;
        data['model'] = this.model;
        data['referenceNumber'] = this.referenceNumber;
        data['serialNumber'] = this.serialNumber;
        data['productionYear'] = this.productionYear;
        data['purchaseDate'] = this.purchaseDate;
        data['purchasePrice'] = this.purchasePrice;
        data['hasPapers'] = this.hasPapers;
        data['hasBox'] = this.hasBox;
        data['hasRecordOfAuthentication'] = this.hasRecordOfAuthentication;
        data['descriptionOfCondition'] = this.descriptionOfCondition;
        data['story'] = this.story;
        if (Array.isArray(this.imageUrls)) {
            data['imageUrls'] = [];
            for (let item of this.imageUrls) data['imageUrls'].push(item);
        }
        data['createdAtTime'] = this.createdAtTime;
        return data;
    }
}

export interface IWatchRecord {
    id?: string | undefined;
    userId?: string | undefined;
    brand?: string | undefined;
    model?: string | undefined;
    referenceNumber?: string | undefined;
    serialNumber?: string | undefined;
    productionYear?: number | undefined;
    purchaseDate?: number | undefined;
    purchasePrice?: number | undefined;
    hasPapers?: boolean | undefined;
    hasBox?: boolean | undefined;
    hasRecordOfAuthentication?: boolean | undefined;
    descriptionOfCondition?: string | undefined;
    story?: string | undefined;
    imageUrls?: string[] | undefined;
    createdAtTime?: number;
}

export interface FileParameter {
    data: any;
    fileName: string;
}

export class ApiException extends Error {
    message: string;
    status: number;
    response: string;
    headers: { [key: string]: any };
    result: any;

    constructor(
        message: string,
        status: number,
        response: string,
        headers: { [key: string]: any },
        result: any
    ) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isApiException = true;

    static isApiException(obj: any): obj is ApiException {
        return obj.isApiException === true;
    }
}

function throwException(
    message: string,
    status: number,
    response: string,
    headers: { [key: string]: any },
    result?: any
): any {
    if (result !== null && result !== undefined) throw result;
    else throw new ApiException(message, status, response, headers, null);
}
