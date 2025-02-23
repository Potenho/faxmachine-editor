export enum IdolEmotions {
	Happy = 'cHappy',
	NormalTalking = 'cNormalTalking',
	Feed = 'cFeed',
	Angry = 'cAngry',
	Bored = 'cBored',
	Wait = 'cWait'
}

export enum Idols {
	Marie = 'cIdolRight',
	Callie = 'cIdolLeft',
	All = 'cIdolAll',
}

export enum DispFestOptions {
	FaxIn = 'cFaxIn',
	FaxPaper = 'cFaxPaper',
	FaxOut = 'cFaxOut',
	Fest = 'cFest',
}

export enum PictureTypes {
	FirstNewsUFO = 'cFirstNewsUFO',
	FirstNewsCatfish = 'cFirstNewsCatfish',
	MissionEnding = 'cMissionEnding',
	GachiRelease = 'cGachiRelease',
	GachiAreaRelease = 'cGachiAreaRelease',
	GachiRideRelease = 'cGachiRideRelease',
	GachiGoalRelease = 'cGachiGoalRelease',
}

export enum HeaderTypes {
	None = 'cNone',
	FesAnnounce = 'cFesAnnounce',
	FesEnd = 'cFesEnd',
	Stage = 'cStage',
	FirstNewsUFO = 'cFirstNewsUFO',
	FirstNewsCatfish = 'cFirstNewsCatfish',
	MissionEnding = 'cMissionEnding',
	Update = 'cUpdate',
}

export type AnyNewsCommands =
	SpeakRawTextCommand |
	ChangeAnimationCommand |
	SpeakMsgLabelCommand |
	CatchInCommand |
	CatchOutCommand |
	TitleIn |
	TitleOut |
	DispDefaultCommand |
	DispFestCommand |
	DispFixGameCommand |
	DispPictureCommand |
	DispMapCommand |
	ShowHeaderCommand |
	ClearMsgCommand |
	WaitTelopCommand |
	CustomCommand;


export interface CommandCommon<T> {
	Command: T;
}

export interface SpeakerAndEmotion {
	Emotion: IdolEmotions;
	Speaker: Idols;
}

export interface OptionalSkip {
	Skip?: boolean
}

export interface CommandType<T> {
	Type: T;
}

export interface CommandKind<T> {
	Kind: T;
}


// IDOL COMMANDS

export interface SpeakRawTextCommand extends CommandCommon<'SpeakRawText'>, SpeakerAndEmotion, OptionalSkip {
	Text: string;
	WaitButton: boolean;
}

export interface ChangeAnimationCommand extends CommandCommon<'ChangeAnimation'>, SpeakerAndEmotion { }

export interface SpeakMsgLabelCommand extends CommandCommon<'SpeakMsgLabel'>, OptionalSkip {
	Label: string;
}

export interface ClearMsgCommand extends CommandCommon<'ClearMsg'> { }

export interface WaitTelopCommand extends CommandCommon<'WaitTelop'> { }


// NEWS TRANSITION COMMANDS

export interface CatchInCommand extends CommandCommon<'CatchIn'> { }

export interface CatchOutCommand extends CommandCommon<'CatchOut'> { }

export interface TitleIn extends CommandCommon<'TitleIn'> { }

export interface TitleOut extends CommandCommon<'TitleOut'> { }


// NEWS PANEL COMMANNDS

export interface DispDefaultCommand extends CommandCommon<'DispDefault'> { }

export interface DispFestCommand extends CommandCommon<'DispFest'>, CommandKind<DispFestOptions> { }

export interface DispFixGameCommand extends CommandCommon<'DispFixGame'> { }

export interface DispPictureCommand extends CommandCommon<'DispPicture'> {
	Picture: PictureTypes;
}

export interface DispMapCommand extends CommandCommon<'DispMap'> {
	MapId: number;
}

// NEWS HEADER COMMANDS

export interface ShowHeaderCommand extends CommandCommon<'ShowHeader'>, CommandType<HeaderTypes> { }



// CUSTOM

export interface CustomCommand extends CommandCommon<'string'> {
	[key: string]: boolean | string | number;
}