from dataclasses import dataclass
from typing import List

from domain.skill import Skill

@dataclass
class Project:
    name: str
    description: str
    skill: List[Skill]
    created_at: str
    updated_at: str
    link: str


