// src/app/pages/character-list/character-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CharacterService } from '../../services/character.service';
import {
  Character,
  Info,
  CharacterFilter,
} from '../../models/rick-and-morty.interface';
import { CreateCharacterModalComponent } from '../../components/create-character-modal/create-character-modal.component';
import { EditCharacterModalComponent } from '../../components/edit-character-modal/edit-character-modal.component';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CreateCharacterModalComponent,
    EditCharacterModalComponent,
  ],
  templateUrl: './character-list.component.html',
})
export class CharacterListComponent implements OnInit {
  characters: Character[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  totalPages: number = 1;

  isExternal: boolean = false;

  modalOpen: boolean = false;
  characterToDelete: Character | null = null;

  modalCreateOpen: boolean = false;

  modalEditOpen: boolean = false;
  characterToEdit: Partial<Character> = {};

  constructor(
    private characterService: CharacterService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.fetchCharacters();
  }

  setMode(external: boolean): void {
    if (this.isExternal !== external) {
      this.isExternal = external;
      this.currentPage = 1;
      this.fetchCharacters();
    }
  }

  fetchCharacters(): void {
    const filter: CharacterFilter = {
      name: this.searchTerm,
      page: this.currentPage,
    };
    if (this.isExternal) {
      this.characterService.getExternalCharacters(filter).subscribe(
        (res: Info<Character[]>) => {
          this.characters = res.results || [];
          this.totalPages = res.info?.pages || 1;
        },
        (error: any) => console.error('Error en external characters', error)
      );
    } else {
      this.characterService.getCharacters(filter).subscribe(
        (res: Character[]) => {
          this.characters = res;
          this.totalPages = 1;
        },
        (error: any) => console.error('Error en local characters', error)
      );
    }
  }

  onSearch(): void {
    this.currentPage = 1;
    this.fetchCharacters();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.fetchCharacters();
  }

  onDelete(character: Character): void {
    this.characterToDelete = character;
    this.modalOpen = true;
  }

  confirmDelete(): void {
    if (this.characterToDelete) {
      this.characterService
        .deleteCharacter(String(this.characterToDelete.id))
        .subscribe(() => {
          this.fetchCharacters();
          this.closeModal();
        });
    }
  }

  closeModal(): void {
    this.modalOpen = false;
    this.characterToDelete = null;
  }

  openCreateModal(): void {
    this.modalCreateOpen = true;
  }

  closeCreateModal(): void {
    this.modalCreateOpen = false;
  }

  confirmCreate(newChar: Partial<Character>): void {
    this.characterService.createCharacter(newChar).subscribe(
      () => {
        this.fetchCharacters();
        this.closeCreateModal();
      },
      (error: any) => console.error('Error al crear personaje:', error)
    );
  }

  openEditModal(character: Character): void {
    this.characterToEdit = { ...character };
    this.modalEditOpen = true;
  }

  closeEditModal(): void {
    this.modalEditOpen = false;
  }

  confirmEdit(editedChar: Partial<Character>): void {
    this.characterService
      .updateCharacter(String(editedChar.id), editedChar)
      .subscribe(
        () => {
          this.fetchCharacters();
          this.closeEditModal();
        },
        (error: any) => console.error('Error al editar personaje:', error)
      );
  }
}
