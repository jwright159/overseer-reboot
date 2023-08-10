interface Strifer
{
	power: number;
	bonuses: Bonus[];
}

interface Bonus
{
	name: string;
	duration: number;
	value: number;
}

function powerCalc(strifer: Strifer)
{
	let offense = strifer.power;
	let defense = strifer.power;
	let bonuses = {
		aggrieve: 0,
		aggress: 0,
		assail: 0,
		assault: 0,
		abuse: 0,
		accuse: 0,
		abjure: 0,
		abstain: 0,
	};

	strifer.bonuses.forEach(bonus => {
		switch(bonus.name)
		{
			case "power":
			{
				offense += bonus.value;
				defense += bonus.value;
				break;
			}
			case "offense":
			{
				offense += bonus.value;
				break;
			}
			case "defense":
			{
				defense += bonus.value;
				break;
			}
			default:
			{
				if (bonus.name in bonuses)
					bonuses[bonus.name] += bonus.value;
			}
		}
	});
}