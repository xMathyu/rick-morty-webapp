import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  Character,
  Location as RMLocation,
  CharacterLocation,
} from '../../models/rick-and-morty.interface';
import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-create-character-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Overlay layer (transparent background to view the main page) -->
    <div
      class="fixed inset-0 flex items-center justify-center bg-transparent z-50"
      aria-modal="true"
      role="dialog"
    >
      <div
        class="bg-white rounded-lg shadow-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
      >
        <h3 class="text-xl font-bold text-gray-800 mb-4">Create Character</h3>
        <form #createForm="ngForm" class="space-y-4">
          <!-- Name -->
          <div>
            <label class="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              [(ngModel)]="character.name"
              name="name"
              required
              class="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <!-- Status -->
          <div>
            <label class="block text-gray-700 font-medium mb-1">Status</label>
            <select
              [(ngModel)]="character.status"
              name="status"
              class="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Alive">Alive</option>
              <option value="Dead">Dead</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>
          <!-- Gender -->
          <div>
            <label class="block text-gray-700 font-medium mb-1">Gender</label>
            <select
              [(ngModel)]="character.gender"
              name="gender"
              class="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Genderless">Genderless</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>
          <!-- Species -->
          <div>
            <label class="block text-gray-700 font-medium mb-1">Species</label>
            <input
              type="text"
              [(ngModel)]="character.species"
              name="species"
              class="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <!-- Type -->
          <div>
            <label class="block text-gray-700 font-medium mb-1">Type</label>
            <input
              type="text"
              [(ngModel)]="character.type"
              name="type"
              class="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <!-- Image -->
          <div>
            <label class="block text-gray-700 font-medium mb-1"
              >Image URL</label
            >
            <input
              type="text"
              [(ngModel)]="character.image"
              name="image"
              class="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <!-- Origin with autocomplete -->
          <div class="relative autocomplete-origin-container">
            <label class="block text-gray-700 font-medium mb-1">Origin</label>
            <input
              type="text"
              [(ngModel)]="originSearch"
              (input)="onOriginInput()"
              name="originSearch"
              placeholder="Search origin"
              class="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ul
              *ngIf="filteredOrigins.length > 0"
              class="absolute z-10 w-full bg-white border border-gray-300 rounded mt-1 max-h-40 overflow-y-auto"
            >
              <li
                *ngFor="let loc of filteredOrigins"
                (click)="selectOrigin(loc)"
                class="p-2 hover:bg-gray-200 cursor-pointer"
              >
                {{ loc.name }}
              </li>
            </ul>
          </div>
          <!-- Location with autocomplete -->
          <div class="relative autocomplete-location-container">
            <label class="block text-gray-700 font-medium mb-1">Location</label>
            <input
              type="text"
              [(ngModel)]="locationSearch"
              (input)="onLocationInput()"
              name="locationSearch"
              placeholder="Search location"
              class="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ul
              *ngIf="filteredLocations.length > 0"
              class="absolute z-10 w-full bg-white border border-gray-300 rounded mt-1 max-h-40 overflow-y-auto"
            >
              <li
                *ngFor="let loc of filteredLocations"
                (click)="selectLocation(loc)"
                class="p-2 hover:bg-gray-200 cursor-pointer"
              >
                {{ loc.name }}
              </li>
            </ul>
          </div>
        </form>
        <!-- Action buttons -->
        <div class="mt-6 flex justify-end space-x-4">
          <button
            (click)="onCancel()"
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium px-4 py-2 rounded transition-colors duration-200"
            [attr.aria-label]="'Cancel creation'"
          >
            Cancel
          </button>
          <button
            (click)="onCreate()"
            class="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded transition-colors duration-200"
            [attr.aria-label]="'Confirm creation'"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  `,
})
export class CreateCharacterModalComponent implements OnInit {
  @Input() character: Partial<Character> = {
    name: '',
    status: 'unknown',
    species: '',
    gender: 'unknown',
    type: '',
    image: '',
  };
  @Output() create = new EventEmitter<Partial<Character>>();
  @Output() cancel = new EventEmitter<void>();

  originSearch: string = '';
  locationSearch: string = '';
  // We use CharacterLocation for autocomplete
  locations: CharacterLocation[] = [];
  filteredOrigins: CharacterLocation[] = [];
  filteredLocations: CharacterLocation[] = [];

  constructor(private characterService: CharacterService) {}

  ngOnInit(): void {
    this.characterService.getLocations().subscribe(
      (res) => {
        // We assume that res.results is an array and use 'any' for mapping
        const rmLocations = (res.results as any[] | undefined) ?? [];
        this.locations = rmLocations.map((loc) => ({
          name: loc.name,
          url: loc.url,
        }));
      },
      (error: any) => console.error('Error getting locations:', error)
    );
  }

  onOriginInput(): void {
    if (!this.originSearch.trim()) {
      this.filteredOrigins = this.locations;
    } else {
      this.filteredOrigins = this.locations.filter((loc) =>
        loc.name.toLowerCase().includes(this.originSearch.toLowerCase())
      );
    }
  }

  onLocationInput(): void {
    if (!this.locationSearch.trim()) {
      this.filteredLocations = this.locations;
    } else {
      this.filteredLocations = this.locations.filter((loc) =>
        loc.name.toLowerCase().includes(this.locationSearch.toLowerCase())
      );
    }
  }

  selectOrigin(loc: CharacterLocation): void {
    this.character.origin = { name: loc.name, url: loc.url };
    this.originSearch = loc.name;
    this.filteredOrigins = [];
  }

  selectLocation(loc: CharacterLocation): void {
    this.character.location = { name: loc.name, url: loc.url };
    this.locationSearch = loc.name;
    this.filteredLocations = [];
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.autocomplete-origin-container')) {
      this.filteredOrigins = [];
    }
    if (!target.closest('.autocomplete-location-container')) {
      this.filteredLocations = [];
    }
  }

  onCreate(): void {
    this.create.emit(this.character);
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
