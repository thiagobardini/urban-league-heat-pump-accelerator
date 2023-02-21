# frozen_string_literal: true

require 'rails_helper'

# This spec was generated by rspec-rails when you ran the scaffold generator.
# It demonstrates how one might use RSpec to test the controller code that
# was generated by Rails when you ran the scaffold generator.
#
# It assumes that the implementation code is generated by the rails scaffold
# generator. If you are using any extension libraries to generate different
# controller code, this generated spec may or may not pass.
#
# It only uses APIs available in rails and/or rspec-rails. There are a number
# of tools you can use to make these specs even more expressive, but we're
# sticking to rails and rspec-rails APIs to keep things simple and stable.

# rubocop:disable Metrics/BlockLength
RSpec.describe '/assignments', type: :request do
  # This should return the minimal set of attributes required to create a valid
  # Assignment. As you add validations to Assignment, be sure to
  # adjust the attributes here as well.

  let(:user) { FactoryBot.create(:user) }
  let(:surveyor) { FactoryBot.create(:surveyor, user:) }
  let(:valid_attributes) do
    {
      group: 'all-stars',
      surveyor_id: surveyor.id
    }
  end

  let(:invalid_attributes) do
    {
      group: 1,
      surveyor_id: 'boop'
    }
  end

  describe 'GET /index' do
    it 'renders a successful response' do
      Assignment.create! valid_attributes
      get assignments_url, as: :json
      expect(response).to be_successful
    end

    it 'can filter based a surveyor' do
      Assignment.create! valid_attributes
      get assignments_url, params: { surveyor_id: surveyor.id }, as: :json
      expect(response.body).to match(/#{surveyor.id}/)
    end

    it 'can filter based a surveyor' do
      Assignment.create! valid_attributes
      get assignments_url, params: { surveyor_id: 24 }, as: :json
      expect(response.body).not_to match(/#{surveyor.id}/)
    end
  end

  describe 'GET /show' do
    it 'renders a successful response' do
      assignment = Assignment.create! valid_attributes
      get assignment_url(assignment), as: :json
      expect(response).to be_successful
    end
  end

  describe 'GET /new' do
    it 'renders a successful response' do
      get new_assignment_url, as: :json
      expect(response).to be_successful
    end
  end

  describe 'POST /create' do
    context 'with valid parameters' do
      it 'creates a new Assignment' do
        expect do
          post assignments_url, params: { assignment: valid_attributes }, as: :json
        end.to change(Assignment, :count).by(1)
      end

      it 'redirects to the created assignment' do
        post assignments_url, params: { assignment: valid_attributes }, as: :json
        expect(response).to be_successful
      end
    end

    context 'with invalid parameters' do
      it 'does not create a new Assignment' do
        expect do
          post assignments_url, params: { assignment: invalid_attributes }, as: :json
        end.to change(Assignment, :count).by(0)
      end

      it "renders a response with 422 status (i.e. to display the 'new' template)" do
        post assignments_url, params: { assignment: invalid_attributes }, as: :json
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'PATCH /update' do
    context 'with valid parameters' do
      let(:new_attributes) do
        skip('Add a hash of attributes valid for your model')
      end

      it 'updates the requested assignment' do
        assignment = Assignment.create! valid_attributes
        patch assignment_url(assignment), params: { assignment: new_attributes }, as: :json
        assignment.reload
        skip('Add assertions for updated state')
      end

      it 'redirects to the assignment' do
        assignment = Assignment.create! valid_attributes
        patch assignment_url(assignment), params: { assignment: new_attributes }, as: :json
        assignment.reload
        expect(response).to redirect_to(assignment_url(assignment))
      end
    end

    context 'with invalid parameters' do
      it "renders a response with 422 status (i.e. to display the 'edit' template)" do
        assignment = Assignment.create! valid_attributes
        patch assignment_url(assignment), params: { assignment: invalid_attributes }, as: :json
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'DELETE /destroy' do
    it 'destroys the requested assignment' do
      assignment = Assignment.create! valid_attributes
      expect do
        delete assignment_url(assignment), as: :json
      end.to change(Assignment, :count).by(-1)
    end

    it 'returns a valid response' do
      assignment = Assignment.create! valid_attributes
      delete assignment_url(assignment), as: :json
      expect(response).to be_successful
    end
  end
end
# rubocop:enable Metrics/BlockLength
