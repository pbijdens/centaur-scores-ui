import { GroupInfo } from "./group-info";
import { MatchModel } from "./match-model";
import { ScoreButtonDefinition } from "./score-button-definition";

export const MatchTemplates = [
    {
        name: 'Clubavond (3 Pijlen)',
        model: <MatchModel>{
            arrowsPerEnd: 3,
            numberOfEnds: 10,
            isActiveMatch: false,
            autoProgressAfterEachArrow: true,
            groups: [
                <GroupInfo>{ code: '', label: 'Recurve' },
                <GroupInfo>{ code: 'C', label: 'Compound' },
                <GroupInfo>{ code: 'H', label: 'Hout, barebow, instinctive' }
            ],
            subgroups: [
                <GroupInfo>{ code: '', label: 'Senioren' },
                <GroupInfo>{ code: 'A', label: 'Aspiranten (9-11)' },
                <GroupInfo>{ code: 'J', label: 'Jonge Jeugd (12-14)' },
                <GroupInfo>{ code: 'J', label: 'Jeugd (15-18)' },
                <GroupInfo>{ code: 'M', label: 'Masters (50+)' }],
            targets: [
                <GroupInfo>{ code: '', label: 'Standaard 40CM (1-10)' },
                <GroupInfo>{ code: 'CDT', label: 'Compound/Dutch target (6-10)' }
            ],
            id: -1,
            lijnen: ['A', 'B', 'C', 'D'],
            lijnenAsString: 'ABCD',
            matchCode: new Date().toISOString().substring(0, 10),
            matchName: '',
            scoreValues: {
                '': <Array<ScoreButtonDefinition>>[
                    <ScoreButtonDefinition>{ label: '10', value: 10 },
                    <ScoreButtonDefinition>{ label: '9', value: 9 },
                    <ScoreButtonDefinition>{ label: '8', value: 8 },
                    <ScoreButtonDefinition>{ label: '7', value: 7 },
                    <ScoreButtonDefinition>{ label: '6', value: 6 },
                    <ScoreButtonDefinition>{ label: '5', value: 5 },
                    <ScoreButtonDefinition>{ label: '4', value: 4 },
                    <ScoreButtonDefinition>{ label: '3', value: 3 },
                    <ScoreButtonDefinition>{ label: '2', value: 2 },
                    <ScoreButtonDefinition>{ label: '1', value: 1 },
                    <ScoreButtonDefinition>{ label: 'Mis', value: 0 },
                    <ScoreButtonDefinition>{ label: 'Del', value: null },
                ],
                'CDT': <Array<ScoreButtonDefinition>>[
                    <ScoreButtonDefinition>{ label: '10', value: 10 },
                    <ScoreButtonDefinition>{ label: '9', value: 9 },
                    <ScoreButtonDefinition>{ label: '8', value: 8 },
                    <ScoreButtonDefinition>{ label: '7', value: 7 },
                    <ScoreButtonDefinition>{ label: '6', value: 6 },
                    <ScoreButtonDefinition>{ label: 'Mis', value: 0 },
                    <ScoreButtonDefinition>{ label: 'Del', value: null },
                ]
            }
        }
    },

    {
        name: 'Clubavond (1 Pijl)',
        model: <MatchModel>{
            arrowsPerEnd: 5,
            numberOfEnds: 5,
            isActiveMatch: false,
            autoProgressAfterEachArrow: true,
            groups: [
                <GroupInfo>{ code: '', label: 'Recurve' },
                <GroupInfo>{ code: 'C', label: 'Compound' },
                <GroupInfo>{ code: 'H', label: 'Hout, barebow, instinctive' }
            ],
            subgroups: [
                <GroupInfo>{ code: '', label: 'Senioren' },
                <GroupInfo>{ code: 'A', label: 'Aspiranten (9-11)' },
                <GroupInfo>{ code: 'J', label: 'Jonge Jeugd (12-14)' },
                <GroupInfo>{ code: 'J', label: 'Jeugd (15-18)' },
                <GroupInfo>{ code: 'M', label: 'Masters (50+)' }],
            targets: [
                <GroupInfo>{ code: '', label: 'Standaard 40CM (1-10)' },
                <GroupInfo>{ code: 'CDT', label: 'Compound/Dutch target (6-10)' }
            ],
            id: -1,
            lijnen: ['A', 'B', 'C', 'D'],
            lijnenAsString: 'ABCD',
            matchCode: new Date().toISOString().substring(0, 10),
            matchName: '',
            scoreValues: {
                '': <Array<ScoreButtonDefinition>>[
                    <ScoreButtonDefinition>{ label: '10', value: 10 },
                    <ScoreButtonDefinition>{ label: '9', value: 9 },
                    <ScoreButtonDefinition>{ label: '8', value: 8 },
                    <ScoreButtonDefinition>{ label: '7', value: 7 },
                    <ScoreButtonDefinition>{ label: '6', value: 6 },
                    <ScoreButtonDefinition>{ label: '5', value: 5 },
                    <ScoreButtonDefinition>{ label: '4', value: 4 },
                    <ScoreButtonDefinition>{ label: '3', value: 3 },
                    <ScoreButtonDefinition>{ label: '2', value: 2 },
                    <ScoreButtonDefinition>{ label: '1', value: 1 },
                    <ScoreButtonDefinition>{ label: 'Mis', value: 0 },
                    <ScoreButtonDefinition>{ label: 'Del', value: null },
                ],
                'CDT': <Array<ScoreButtonDefinition>>[
                    <ScoreButtonDefinition>{ label: '10', value: 10 },
                    <ScoreButtonDefinition>{ label: '9', value: 9 },
                    <ScoreButtonDefinition>{ label: '8', value: 8 },
                    <ScoreButtonDefinition>{ label: '7', value: 7 },
                    <ScoreButtonDefinition>{ label: '6', value: 6 },
                    <ScoreButtonDefinition>{ label: 'Mis', value: 0 },
                    <ScoreButtonDefinition>{ label: 'Del', value: null },
                ]
            }
        }
    },

    {
        name: 'Lancaster format',
        model: <MatchModel>{
            arrowsPerEnd: 3,
            numberOfEnds: 10,
            isActiveMatch: false,
            autoProgressAfterEachArrow: true,
            groups: [
                <GroupInfo>{ code: '', label: 'Recurve' },
                <GroupInfo>{ code: 'C', label: 'Compound' },
                <GroupInfo>{ code: 'H', label: 'Hout, barebow, instinctive' }
            ],
            subgroups: [
                <GroupInfo>{ code: '', label: 'Senioren' },
                <GroupInfo>{ code: 'A', label: 'Aspiranten (9-11)' },
                <GroupInfo>{ code: 'J', label: 'Jonge Jeugd (12-14)' },
                <GroupInfo>{ code: 'J', label: 'Jeugd (15-18)' },
                <GroupInfo>{ code: 'M', label: 'Masters (50+)' }],
            targets: [
                <GroupInfo>{ code: '', label: 'Lancaster 6-11' },
                <GroupInfo>{ code: 'LA1140', label: 'Lancaster 1-11 (40CM)' },
                <GroupInfo>{ code: 'LA12DT', label: 'Lancaster 6-12 (finale)' },
                <GroupInfo>{ code: 'LA1240', label: 'Lancaster 1-12 (40CM finale)' }
            ],
            id: -1,
            lijnen: ['A', 'B', 'C', 'D'],
            lijnenAsString: 'ABCD',
            matchCode: new Date().toISOString().substring(0, 10),
            matchName: '',
            scoreValues: {
                '': <Array<ScoreButtonDefinition>>[
                    <ScoreButtonDefinition>{ label: '11', value: 11 },
                    <ScoreButtonDefinition>{ label: '10', value: 10 },
                    <ScoreButtonDefinition>{ label: '9', value: 9 },
                    <ScoreButtonDefinition>{ label: '8', value: 8 },
                    <ScoreButtonDefinition>{ label: '7', value: 7 },
                    <ScoreButtonDefinition>{ label: '6', value: 6 },
                    <ScoreButtonDefinition>{ label: 'Mis', value: 0 },
                    <ScoreButtonDefinition>{ label: 'Del', value: null },
                ],
                'LA1140': <Array<ScoreButtonDefinition>>[
                    <ScoreButtonDefinition>{ label: '11', value: 11 },
                    <ScoreButtonDefinition>{ label: '10', value: 10 },
                    <ScoreButtonDefinition>{ label: '9', value: 9 },
                    <ScoreButtonDefinition>{ label: '8', value: 8 },
                    <ScoreButtonDefinition>{ label: '7', value: 7 },
                    <ScoreButtonDefinition>{ label: '6', value: 6 },
                    <ScoreButtonDefinition>{ label: '5', value: 5 },
                    <ScoreButtonDefinition>{ label: '4', value: 4 },
                    <ScoreButtonDefinition>{ label: '3', value: 3 },
                    <ScoreButtonDefinition>{ label: '2', value: 2 },
                    <ScoreButtonDefinition>{ label: '1', value: 1 },
                    <ScoreButtonDefinition>{ label: 'Mis', value: 0 },
                    <ScoreButtonDefinition>{ label: 'Del', value: null },
                ],
                'LA1240': <Array<ScoreButtonDefinition>>[
                    <ScoreButtonDefinition>{ label: '12', value: 12 },
                    <ScoreButtonDefinition>{ label: '11', value: 11 },
                    <ScoreButtonDefinition>{ label: '10', value: 10 },
                    <ScoreButtonDefinition>{ label: '9', value: 9 },
                    <ScoreButtonDefinition>{ label: '8', value: 8 },
                    <ScoreButtonDefinition>{ label: '7', value: 7 },
                    <ScoreButtonDefinition>{ label: '6', value: 6 },
                    <ScoreButtonDefinition>{ label: '5', value: 5 },
                    <ScoreButtonDefinition>{ label: '4', value: 4 },
                    <ScoreButtonDefinition>{ label: '3', value: 3 },
                    <ScoreButtonDefinition>{ label: '2', value: 2 },
                    <ScoreButtonDefinition>{ label: '1', value: 1 },
                    <ScoreButtonDefinition>{ label: 'Mis', value: 0 },
                    <ScoreButtonDefinition>{ label: 'Del', value: null },
                ],
                'LA12DT': <Array<ScoreButtonDefinition>>[
                    <ScoreButtonDefinition>{ label: '12', value: 12 },
                    <ScoreButtonDefinition>{ label: '11', value: 11 },
                    <ScoreButtonDefinition>{ label: '10', value: 10 },
                    <ScoreButtonDefinition>{ label: '9', value: 9 },
                    <ScoreButtonDefinition>{ label: '8', value: 8 },
                    <ScoreButtonDefinition>{ label: '7', value: 7 },
                    <ScoreButtonDefinition>{ label: '6', value: 6 },
                    <ScoreButtonDefinition>{ label: 'Mis', value: 0 },
                    <ScoreButtonDefinition>{ label: 'Del', value: null },
                ],
            }
        }
    },

    {
        name: 'KHSN Leefdtijdsklasses, 3pijl',
        model: <MatchModel>{
            arrowsPerEnd: 3,
            numberOfEnds: 10,
            isActiveMatch: false,
            autoProgressAfterEachArrow: true,
            groups: [
                <GroupInfo>{ code: '', label: 'Recurve' },
                <GroupInfo>{ code: 'C', label: 'Compound' },
                <GroupInfo>{ code: 'H', label: 'Hout/Barebow' }
            ],
            subgroups: [
                <GroupInfo>{ code: '', label: 'Senior' },
                <GroupInfo>{ code: 'O12', label: 'Onder 12' },
                <GroupInfo>{ code: 'O14', label: 'Onder 14' },
                <GroupInfo>{ code: 'O18', label: 'Onder 18' },
                <GroupInfo>{ code: 'O21', label: 'Onder 21' },
                <GroupInfo>{ code: 'MAS', label: '50+' },
                <GroupInfo>{ code: 'VET', label: '60+' }
            ],
                
            targets: [
                <GroupInfo>{ code: '', label: 'Standaard (1 t/m 10)' },
                <GroupInfo>{ code: 'DT', label: 'Dutch Target (6 t/m 10)' },
                <GroupInfo>{ code: 'C', label: 'Compound (6 t/m 10)' },
            ],
            id: -1,
            lijnen: ['A', 'B', 'C', 'D'],
            lijnenAsString: 'ABCD',
            matchCode: new Date().toISOString().substring(0, 10),
            matchName: '',
            scoreValues: {
                '': <Array<ScoreButtonDefinition>>[
                    <ScoreButtonDefinition>{ label: '10', value: 10 },
                    <ScoreButtonDefinition>{ label: '9', value: 9 },
                    <ScoreButtonDefinition>{ label: '8', value: 8 },
                    <ScoreButtonDefinition>{ label: '7', value: 7 },
                    <ScoreButtonDefinition>{ label: '6', value: 6 },
                    <ScoreButtonDefinition>{ label: '5', value: 5 },
                    <ScoreButtonDefinition>{ label: '4', value: 4 },
                    <ScoreButtonDefinition>{ label: '3', value: 3 },
                    <ScoreButtonDefinition>{ label: '2', value: 2 },
                    <ScoreButtonDefinition>{ label: '1', value: 1 },
                    <ScoreButtonDefinition>{ label: 'Mis', value: 0 }, 
                    <ScoreButtonDefinition>{ label: 'Del', value: null },
                ],
                'DT': <Array<ScoreButtonDefinition>>[
                    <ScoreButtonDefinition>{ label: '10', value: 10 },
                    <ScoreButtonDefinition>{ label: '9', value: 9 },
                    <ScoreButtonDefinition>{ label: '8', value: 8 },
                    <ScoreButtonDefinition>{ label: '7', value: 7 },
                    <ScoreButtonDefinition>{ label: '6', value: 6 },
                    <ScoreButtonDefinition>{ label: 'Mis', value: 0 }, 
                    <ScoreButtonDefinition>{ label: 'Del', value: null },
                ],
                'C': <Array<ScoreButtonDefinition>>[
                    <ScoreButtonDefinition>{ label: '10', value: 10 },
                    <ScoreButtonDefinition>{ label: '9', value: 9 },
                    <ScoreButtonDefinition>{ label: '8', value: 8 },
                    <ScoreButtonDefinition>{ label: '7', value: 7 },
                    <ScoreButtonDefinition>{ label: '6', value: 6 },
                    <ScoreButtonDefinition>{ label: 'Mis', value: 0 }, 
                    <ScoreButtonDefinition>{ label: 'Del', value: null },
                ],
            },
        }
    },

    

    

];
