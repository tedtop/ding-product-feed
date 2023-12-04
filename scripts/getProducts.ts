import dotenv from 'dotenv';
dotenv.config();

const API_URL = process.env.API_URL || '';
const API_KEY = process.env.API_KEY || '';

interface Product {
    ProviderCode: string;
    SkuCode: string;
    LocalizationKey: string;
    SettingDefinitions: {
        Name: string;
        Description: string;
        IsMandatory: boolean;
    }[];
    Maximum: {
        CustomerFee: number;
        DistributorFee: number;
        ReceiveValue: number;
        ReceiveCurrencyIso: string;
        ReceiveValueExcludingTax: number;
        TaxRate: number;
        TaxName: string;
        TaxCalculation: string;
        SendValue: number;
        SendCurrencyIso: string;
    };
    Minimum: {
        CustomerFee: number;
        DistributorFee: number;
        ReceiveValue: number;
        ReceiveCurrencyIso: string;
        ReceiveValueExcludingTax: number;
        TaxRate: number;
        TaxName: string;
        TaxCalculation: string;
        SendValue: number;
        SendCurrencyIso: string;
    };
    CommissionRate: number;
    ProcessingMode: string;
    RedemptionMechanism: string;
    Benefits: string[];
    ValidityPeriodIso: string;
    UatNumber: string;
    AdditionalInformation: string;
    DefaultDisplayText: string;
    RegionCode: string;
    PaymentTypes: string[];
    LookupBillsRequired: boolean;
}

// Fetch product from the API
fetch(API_URL, {
    headers: {
        api_key: API_KEY
    }
})
    .then(response => response.json())
    .then((data: { Items: Product[] }) => {

        // Map the data to the flattened product model
        const flattenedProducts = data.Items.map((product: Product) => ({
            ProviderCode: product.ProviderCode,
            SkuCode: product.SkuCode,
            LocalizationKey: product.LocalizationKey,
            MaximumCustomerFee: product.Maximum.CustomerFee,
            MaximumDistributorFee: product.Maximum.DistributorFee,
            MaximumReceiveValue: product.Maximum.ReceiveValue,
            MaximumReceiveCurrencyIso: product.Maximum.ReceiveCurrencyIso,
            MaximumReceiveValueExcludingTax: product.Maximum.ReceiveValueExcludingTax,
            MaximumTaxRate: product.Maximum.TaxRate,
            MaximumSendValue: product.Maximum.SendValue,
            MaximumSendCurrencyIso: product.Maximum.SendCurrencyIso,
            MinimumCustomerFee: product.Minimum.CustomerFee,
            MinimumDistributorFee: product.Minimum.DistributorFee,
            MinimumReceiveValue: product.Minimum.ReceiveValue,
            MinimumReceiveCurrencyIso: product.Minimum.ReceiveCurrencyIso,
            MinimumReceiveValueExcludingTax: product.Minimum.ReceiveValueExcludingTax,
            MinimumTaxRate: product.Minimum.TaxRate,
            MinimumSendValue: product.Minimum.SendValue,
            MinimumSendCurrencyIso: product.Minimum.SendCurrencyIso,
            CommissionRate: product.CommissionRate,
            ProcessingMode: product.ProcessingMode,
            RedemptionMechanism: product.RedemptionMechanism,
            Benefits: product.Benefits.join(','),
            UatNumber: product.UatNumber,
            DefaultDisplayText: product.DefaultDisplayText,
            RegionCode: product.RegionCode,
            PaymentTypes: product.PaymentTypes.join(','),
            LookupBillsRequired: product.LookupBillsRequired
        }));

        console.log(flattenedProducts);
    })
    .catch(error => {
        console.error('Error: ', error);
    });
