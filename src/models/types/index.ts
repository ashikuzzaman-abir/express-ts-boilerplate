export type AddressType = {
	house: string;
	village: string;
	ward: number;
	union: string;
	thana: string;
	district: string;
	zip: number;
};

export type EmergencyContactType = {
	name: string;
	phone: string;
};

export type SpouseType = {
	name: string;
	phone: string;
};

export type OffSpringType = [
	{
		name: string;
		phone: string;
	}
];
// should change at some point
export type PressureType = {
	high: number;
	low: number;
};
