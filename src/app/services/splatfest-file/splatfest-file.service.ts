import { Injectable } from '@angular/core';
import { Languages, SplatfestFileModel } from '../editor/models/splatfest-files-model';
import { NotASplatfestFileError } from './splatfest-file-errors';
import BymlParser from '../../modules/byaml/byaml-reader';
import { ByamlWriter } from '../../modules/byaml/byaml-writer';

@Injectable({
  providedIn: 'root'
})
export class SplatfestFileService {

  /**
   * Reads and parses a Splatfest file.
   *
   * @param {File} file - The file to be read and parsed.
   * @returns {Promise<SplatfestFileModel>} A promise that resolves to a SplatfestFileModel object if the file is successfully parsed.
   * @throws {Error} If there is an error reading the file or parsing its contents.
   * @throws {NotASplatfestFileError} If the parsed file does not conform to the SplatfestFileModel structure.
   */
  async readSplatfestFile(file: File): Promise<SplatfestFileModel> {
    let fileArray: ArrayBuffer;

    try {
      fileArray = await this._readFile(file);
      return this.parseSplatfestFile(fileArray);
    
    } catch(error) {
      return Promise.reject(error);
    
    }
  }
  

  /**
   * Parses a Splatfest file from the given ArrayBuffer.
   *
   * @param buffer - The ArrayBuffer containing the Splatfest file data.
   * @returns The parsed Splatfest file model.
   * @throws NotASplatfestFileError - If the parsed data is not a valid Splatfest file model.
   */
  parseSplatfestFile(buffer: ArrayBuffer): SplatfestFileModel {
    const parse = new BymlParser(buffer).parse();

    if (!this.isSplatfestFileModel(parse)) {
      throw new NotASplatfestFileError();
    }

    return parse;
  }



  /**
   * Converts a SplatfestFileModel to a BYAML format and returns it as a Uint8Array.
   *
   * @param splatfestModel - The model representing the Splatfest file data.
   * @returns The BYAML representation of the Splatfest file as a Uint8Array.
   */
  writeSplatfestFile(splatfestModel: SplatfestFileModel): Uint8Array {
    const result = new ByamlWriter(splatfestModel, true).parseToByaml();
    return result;
  }



  /**
   * Checks if the given object conforms to the SplatfestFileModel interface.
   *
   * @param obj - The object to check.
   * @returns `true` if the object matches the SplatfestFileModel interface, otherwise `false`.
   *
   * The object is considered a valid SplatfestFileModel if:
   * - It is an object.
   * - It has a `FestivalId` property of type `number`.
   * - It has a `BattleResultRate` property of type `number`.
   * - It has a `SeparateMatchingJP` property of type `boolean`.
   * - It has a `LowPopulationNotJP` property of type `boolean`.
   * - It has a `HideTeamNamesOnBoard` property of type `boolean`.
   * - It has a `Version` property of type `number`.
   * - It has a `Time` property which is an object containing:
   *   - `Announce` property of type `string`.
   *   - `Start` property of type `string`.
   *   - `End` property of type `string`.
   *   - `Result` property of type `string`.
   * - It has a `Rule` property of type `string`.
   * - It has a `Stages` property which is an array with 1 to 3 elements, each having:
   *   - `MapID` property of type `number`.
   * - It has a `Teams` property which is an array with exactly 3 elements, each having:
   *   - `Name` property of type `object`.
   *   - `ShortName` property of type `object`.
   *   - `Color` property of type `string`.
   * - It has a `News` property which is an array with exactly 4 elements, each having:
   *   - `NewsType` property of type `string`.
   *   - A property corresponding to `Languages.EUde` that is not `undefined`.
   */
  isSplatfestFileModel(obj: any): obj is SplatfestFileModel {
    return (
      typeof obj === 'object' &&
      typeof obj.FestivalId === 'number' &&
      typeof obj.BattleResultRate === 'number' &&
      typeof obj.SeparateMatchingJP === 'boolean' &&
      typeof obj.LowPopulationNotJP === 'boolean' &&
      typeof obj.HideTeamNamesOnBoard === 'boolean' &&
      typeof obj.Version === 'number' &&
      typeof obj.Time === 'object' &&
      typeof obj.Time.Announce === 'string' &&
      typeof obj.Time.Start === 'string' &&
      typeof obj.Time.End === 'string' &&
      typeof obj.Time.Result === 'string' &&
      typeof obj.Rule === 'string' &&
      Array.isArray(obj.Stages) &&
      obj.Stages.length >= 1 &&
      obj.Stages.length <= 3 &&
      obj.Stages.every((stage: any) => typeof stage.MapID === 'number') &&
      Array.isArray(obj.Teams) &&
      obj.Teams.length === 3 &&
      typeof obj.Teams[0].Name === 'object' &&
      typeof obj.Teams[0].ShortName === 'object' &&
      typeof obj.Teams[0].Color === 'string' &&
      typeof obj.Teams[1].Name === 'object' &&
      typeof obj.Teams[1].ShortName === 'object' &&
      typeof obj.Teams[1].Color === 'string' &&
      typeof obj.Teams[2].Color === 'string' &&
      Array.isArray(obj.News) &&
      obj.News.length === 4 &&
      obj.News.every((news: any) => typeof news.NewsType === 'string' && typeof news[Languages.EUde] !== 'undefined')
    );
  }


  /**
   * Initiates a download of a file represented by a byte array.
   *
   * @param byteArray - The byte array representing the file content. Mostly used for Splatfest BYAML files.
   * @param filename - The name of the file to be downloaded.
   */
  downloadFile(byteArray: Uint8Array, filename: string) {
    const blob = new Blob([byteArray], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    const aElement = document.createElement('a');
    aElement.href = url;
    aElement.download = filename;
    aElement.click();
    window.URL.revokeObjectURL(url);
    aElement.remove();
  }


  /**
   * Reads the provided file and returns its content as an ArrayBuffer.
   * 
   * @param file - The file to be read.
   * @returns A promise that resolves with the file content as an ArrayBuffer.
   * @throws An error if the file cannot be read.
   */
  private async _readFile(file: File): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = () => resolve(reader.result as ArrayBuffer)
      reader.onerror = () => reject(reader.error)
  
      reader.readAsArrayBuffer(file);
    })
  }
}
