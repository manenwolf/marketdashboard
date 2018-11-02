import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.

const munten = [
    {
        naam: 'aaa',
        prijs: 100,
        prijsverandeing: 1,
        stijgend: true
    },
        {
        naam: 'bbb',
        prijs: 100,
        prijsverandeing: 2,
        stijgend: true
    },
    {
        naam: 'ccc',
        prijs: 100,
        prijsverandeing: 0.5,
        stijgend: true
    },
    {
        naam: 'ddd',
        prijs: 100,
        prijsverandeing: 1,
        stijgend: false
    },
    {
        naam: 'eee',
        prijs: 5,
        prijsverandeing: 1,
        stijgend: true
    },
    {
        naam: 'fff',
        prijs: 20,
        prijsverandeing: 1,
        stijgend: false
    },
    {
        naam: 'ggg',
        prijs: 100,
        prijsverandeing: 1,
        stijgend: true
    },
    {
        naam: 'hhh',
        prijs: 30,
        prijsverandeing: 1,
        stijgend: true
    },
    {
        naam: 'iii',
        prijs: 25.5,
        prijsverandeing: 1,
        stijgend: true
    },
    {
        naam: 'jjj',
        prijs: 100,
        prijsverandeing: 1,
        stijgend: true
    },
    {
        naam: 'kkk',
        prijs: 100,
        prijsverandeing: 1,
        stijgend: true
    },
    {
        naam: 'lll',
        prijs: 100,
        prijsverandeing: 1,
        stijgend: true
    },
    {
        naam: 'mmm',
        prijs: 100,
        prijsverandeing: 1,
        stijgend: true
    }
];

class MuntApi{
    static getAllMunten(){
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(Object.assign([], munten));
          }, delay);
        });
      }

}



export default MuntApi;