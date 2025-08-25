import * as fs from 'fs';
import * as path from 'path';

let jsonPath = path.resolve(__dirname, '../nationalLevels.json');
if (!fs.existsSync(jsonPath)) {
    jsonPath = path.resolve(__dirname, '../../src/nationalLevels.json');
}
const raw = fs.readFileSync(jsonPath, 'utf-8');
const nationalLevels = JSON.parse(raw);

// 解析每级升级所需经验
export function getLevelXpTable(): number[] {
    const xpTable: number[] = [];
    const dataArr = nationalLevels.Exports[0].Table.Data;
    for (const levelObj of dataArr) {
        if (!levelObj.Value) continue;
        for (const prop of levelObj.Value) {
            if (prop.Name === "xp_5_404B424C46B392AF3C9F588702B0B1C3") {
                xpTable.push(prop.Value);
                break;
            }
        }
    }
    return xpTable;
}
