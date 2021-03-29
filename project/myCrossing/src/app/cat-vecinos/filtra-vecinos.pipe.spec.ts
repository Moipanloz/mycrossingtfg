import { IVillager, villagers } from 'animal-crossing';
import { FiltraVecinosPipe } from './filtra-vecinos.pipe';

describe('FiltraVecinosPipe', () => {
  let listaVecinos : IVillager[] = villagers.filter(v=>v.sourceSheet!=null);
  const pipe = new FiltraVecinosPipe();
  it('create an instance', () => {
    const pipe = new FiltraVecinosPipe();
    expect(pipe).toBeTruthy();
  });

  it('should modify list by personality', () => {
    expect(pipe.transform(listaVecinos,'','','').length).not.toEqual(pipe.transform(listaVecinos,'Cranky','','').length);
  });

  it('should modify list by specie', () => {
    expect(pipe.transform(listaVecinos,'','','').length).not.toEqual(pipe.transform(listaVecinos,'','Bird','').length);
  });

  it('should modify list by gender', () => {
    expect(pipe.transform(listaVecinos,'','','').length).not.toEqual(pipe.transform(listaVecinos,'','','f').length);
  });
});
