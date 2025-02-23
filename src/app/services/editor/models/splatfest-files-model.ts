import { AnyNewsCommands } from "./news-commands-model";


export enum Languages {
	EUde = 'EUde',
	EUen = 'EUen',
	EUes = 'EUes',
	EUfr = 'EUfr',
	EUit = 'EUit',
	JPja = 'JPja',
	USen = 'USen',
	USes = 'USes',
	USfr = 'USfr',
}

export enum NewsTypes {
	Announce = 'Announce',
	Start = 'Start',
	ResultA = 'ResultA',
	ResultB = 'ResultB',
}

export interface SplatfestEtcParams {
	FestivalId: number;
	BattleResultRate: number;
	SeparateMatchingJP: boolean;
	LowPopulationNotJP: boolean;
	HideTeamNamesOnBoard: boolean;
	Version: number;
}

export interface SplatfestTime {
	Time: {
		Announce: string,
		Start: string,
		End: string,
		Result: string,
	}
}

export interface SplatfestRotation {
	Rule: string,
	Stages: [StageConfig, StageConfig?, StageConfig?];
}

export interface StageConfig {
	MapID: number;
}

export interface SplatfestTeams {
	Teams: [TeamConfig, TeamConfig, TeamColor]
}

export interface TeamColor {
	Color: string,
}

export interface TeamConfig extends TeamColor {
	Name: Record<Languages, string>,
	ShortName: Record<Languages, string>,
}

export interface SplatfestNewsScript {
	News: [
		NewsScript<NewsTypes.Announce>,
		NewsScript<NewsTypes.Start>,
		NewsScript<NewsTypes.ResultA>,
		NewsScript<NewsTypes.ResultB>
	];
}

export type NewsScript<T> = {
	[key in Languages]: AnyNewsCommands[];
} & {
	NewsType: T;
};

// WHOLE SPLATFEST MODEL

export interface SplatfestFileModel extends SplatfestEtcParams, SplatfestTime, SplatfestRotation, SplatfestTeams, SplatfestNewsScript { }