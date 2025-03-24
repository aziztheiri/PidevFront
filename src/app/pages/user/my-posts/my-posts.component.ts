import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/models/post.model';
import { AuthService } from 'src/app/services/auth.service';
import { ForumService } from 'src/app/services/forum.service';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.scss']
})
export class MyPostsComponent {
  myPosts: Post[] = [];
  loading = false;
  error = '';

  // Dropdown management: track which post card's dropdown is open.
  selectedDropdownPostId: number | null = null;

  // Update modal state and form
  showUpdateModal = false;
  updatePostForm!: FormGroup;
  updating = false;
  updateError = '';
  selectedPost!: Post; // Post being updated

  constructor(
    private forumService: ForumService,
    private authService: AuthService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.fetchPosts();
    this.updatePostForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  fetchPosts(): void {
    this.loading = true;
    this.forumService.getPosts().subscribe({
      next: (posts: Post[]) => {
        const currentUser = this.authService.currentUserSubject.getValue();
        if (currentUser && currentUser.cin) {
          this.myPosts = posts.filter(post => post.cin === currentUser.cin);
        } else {
          this.myPosts = [];
        }
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Error fetching posts';
        this.loading = false;
      }
    });
  }

  // Toggle the dropdown for a specific post card
  toggleDropdown(postId: number): void {
    if (this.selectedDropdownPostId === postId) {
      this.selectedDropdownPostId = null;
    } else {
      this.selectedDropdownPostId = postId;
    }
  }

  closeDropdown(): void {
    this.selectedDropdownPostId = null;
  }

  // Delete a post after confirmation
  onDeletePost(postId: number): void {
    if (confirm('Are you sure you want to delete this post?')) {
      this.forumService.deletePost(postId).subscribe({
        next: () => {
          this.fetchPosts();
        },
        error: (err) => {
          console.error(err);
          alert('Error deleting post.');
        }
      });
    }
  }

  // Open update modal with the selected post data
  openUpdateModal(post: Post): void {
    this.selectedPost = post;
    this.updatePostForm.patchValue({
      title: post.title,
      content: post.content
    });
    this.showUpdateModal = true;
    this.updateError = '';
    this.closeDropdown();
  }

  closeUpdateModal(): void {
    this.showUpdateModal = false;
  }

  // Submit update form
  onUpdatePost(): void {
    if (this.updatePostForm.invalid) {
      return;
    }
    this.updating = true;
    const updatedData = this.updatePostForm.value;
    // Ensure that the CIN is included in the payload
    const currentUser = this.authService.currentUserSubject.getValue();
    if (currentUser && currentUser.cin) {
      updatedData.cin = currentUser.cin;
    } else {
      // fallback to using the selected post's CIN
      updatedData.cin = this.selectedPost.cin;
    }
    this.forumService.updatePost(this.selectedPost.id!, updatedData).subscribe({
      next: (data) => {
        this.updating = false;
        this.closeUpdateModal();
        this.fetchPosts();
      },
      error: (err) => {
        console.error(err);
        this.updateError = 'Failed to update post. Please try again.';
        this.updating = false;
      }
    });
  }
}
