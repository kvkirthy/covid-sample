export interface CovidList{
    cases_time_series: any;
    statewise: Array< CovidAtState>;
	tested: any;
}

export interface CovidAtState{
	active: number;
	confirmed: number,
	deaths: number,
	deltaconfirmed: number,
	deltadeaths: number,
	deltarecovered: number,
	lastupdatedtime: Date,
	migratedother: number,
	recovered: number,
	state: string,
	statecode: string,
	statenotes: string
}