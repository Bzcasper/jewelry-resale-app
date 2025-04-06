import { createClient } from '@supabase/supabase-js';
import { publishProduct } from './cline/agents/publish-listing.js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const adminPreview = {
  renderSyncTab: async function (products) {
    const syncContainer = document.getElementById('sync-container');
    syncContainer.innerHTML = '';

    // Add the "Sync Listings" tab to the Admin Dashboard
    const dashboardTabs = document.createElement('div');
    dashboardTabs.className = 'dashboard-tabs';
    syncContainer.appendChild(dashboardTabs);

    const inventoryTab = document.createElement('button');
    inventoryTab.textContent = 'Inventory';
    inventoryTab.onclick = () => {
      document.getElementById('sync-container').style.display = 'none';
      document.getElementById('preview-container').style.display = 'block';
      this.renderPreview(products);
    };
    dashboardTabs.appendChild(inventoryTab);

    const syncTab = document.createElement('button');
    syncTab.textContent = 'Sync Listings';
    syncTab.onclick = () => {
      document.getElementById('sync-container').style.display = 'block';
      document.getElementById('preview-container').style.display = 'none';
      this.renderSyncTab(products);
    };
    dashboardTabs.appendChild(syncTab);

    // Add 'Auto-Sync on Publish' toggle
    const autoSyncToggle = document.createElement('label');
    autoSyncToggle.className = 'toggle-switch';
    autoSyncToggle.innerHTML = `
      <input type="checkbox" id="autoSyncToggle" ${this.autoSyncEnabled ? 'checked' : ''}>
      <span class="slider round"></span>
      <span>Auto-Sync on Publish</span>
    `;
    autoSyncToggle.querySelector('input').addEventListener('change', (event) => {
      this.autoSyncEnabled = event.target.checked;
      localStorage.setItem('autoSyncEnabled', this.autoSyncEnabled);
    });
    dashboardTabs.appendChild(autoSyncToggle);


products.forEach(product => {
  const productRow = document.createElement('div');
  productRow.className = 'product-row';
  productRow.setAttribute('data-product-id', product.id);
  productRow.innerHTML = `
    <h3>${product.title}</h3>
    <div class="status-badges">
      <span class="badge etsy-status ${product.platform_status.etsy_id ? 'synced' : product.platform_status.etsy_id === null ? 'error' : 'pending'}">Etsy: ${product.platform_status.etsy_id ? 'Synced' : product.platform_status.etsy_id === null ? 'Error' : 'Pending'}</span>
      <span class="badge ebay-status ${product.platform_status.ebay_id ? 'synced' : product.platform_status.ebay_id === null ? 'error' : 'pending'}">eBay: ${product.platform_status.ebay_id ? 'Synced' : product.platform_status.ebay_id === null ? 'Error' : 'Pending'}</span>
      <span class="badge shopify-status ${product.platform_status.shopify_id ? 'synced' : product.platform_status.shopify_id === null ? 'error' : 'pending'}">Shopify: ${product.platform_status.shopify_id ? 'Synced' : product.platform_status.shopify_id === null ? 'Error' : 'Pending'}</span>
    </div>
    <div class="action-buttons">
      <button onclick="adminPreview.syncProduct('${product.id}', 'etsy')" class="sync-button etsy-button ${product.platform_status.etsy_id ? 'synced' : 'pending'}">${product.platform_status.etsy_id ? 'Synced' : 'Push Now'}</button>
      <button onclick="adminPreview.syncProduct('${product.id}', 'ebay')" class="sync-button ebay-button ${product.platform_status.ebay_id ? 'synced' : 'pending'}">${product.platform_status.ebay_id ? 'Synced' : 'Push Now'}</button>
      <button onclick="adminPreview.syncProduct('${product.id}', 'shopify')" class="sync-button shopify-button ${product.platform_status.shopify_id ? 'synced' : 'pending'}">${product.platform_status.shopify_id ? 'Synced' : 'Push Now'}</button>
    </div>
    <div class="listing-urls">
      <a href="#" class="etsy-url" style="display: ${product.platform_status.etsy_id ? 'inline' : 'none'}"></a>
      <a href="#" class="ebay-url" style="display: ${product.platform_status.ebay_id ? 'inline' : 'none'}"></a>
      <a href="#" class="shopify-url" style="display: ${product.platform_status.shopify_id ? 'inline' : 'none'}"></a>
    </div>
  `;
  syncContainer.appendChild(productRow);

  // Add loading state to buttons
  const etsyButton = productRow.querySelector('.etsy-button');
  const ebayButton = productRow.querySelector('.ebay-button');
  const shopifyButton = productRow.querySelector('.shopify-button');

  etsyButton.addEventListener('click', async () => {
    etsyButton.disabled = true;
    etsyButton.textContent = 'Syncing...';
    await adminPreview.syncProduct(product.id, 'etsy');
    etsyButton.disabled = false;
    etsyButton.textContent = product.platform_status.etsy_id ? 'Synced' : 'Push Now';
  });

  ebayButton.addEventListener('click', async () => {
    ebayButton.disabled = true;
    ebayButton.textContent = 'Syncing...';
    await adminPreview.syncProduct(product.id, 'ebay');
    ebayButton.disabled = false;
    ebayButton.textContent = product.platform_status.ebay_id ? 'Synced' : 'Push Now';
  });

  shopifyButton.addEventListener('click', async () => {
    shopifyButton.disabled = true;
    shopifyButton.textContent = 'Syncing...';
    await adminPreview.syncProduct(product.id, 'shopify');
    shopifyButton.disabled = false;
    shopifyButton.textContent = product.platform_status.shopify_id ? 'Synced' : 'Push Now';
  });
});

    // Add filter options
    const filterContainer = document.createElement('div');
    filterContainer.className = 'filter-container';
    const filterSelect = document.createElement('select');
    filterSelect.innerHTML = `
      <option value="all">Show All</option>
      <option value="errors">Show Errors</option>
      <option value="pending">Show Pending</option>
    `;
    filterSelect.onchange = () => this.filterProducts(products, filterSelect.value);
    filterContainer.appendChild(filterSelect);
    syncContainer.insertBefore(filterContainer, syncContainer.firstChild);
  },
  filterProducts: function (products, filter) {
    const syncContainer = document.getElementById('sync-container');
    syncContainer.innerHTML = '';

    const filteredProducts = products.filter(product => {
      if (filter === 'all') return true;
      if (filter === 'errors') {
        return Object.values(product.platform_status).some(status => status === null);
      }
      if (filter === 'pending') {
        return Object.values(product.platform_status).some(status => status === undefined);
      }
      return false;
    });

    this.renderSyncTab(filteredProducts);
  },

  syncProduct: async function (productId, platform) {
    const { data: product, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single();

    if (error) {
      console.error('Error fetching product:', error);
      return;
    }

    let listingId;
    switch (platform) {
      case 'etsy':
        listingId = await this.createEtsyListing(product);
        break;
      case 'ebay':
        listingId = await this.createEbayListing(product);
        break;
      case 'shopify':
        listingId = await this.createShopifyListing(product);
        break;
      default:
        console.error('Unsupported platform:', platform);
        return;
    }

    if (listingId) {
      const { error: updateError } = await supabase
        .from('products')
        .update({ [`platform_status.${platform}_id`]: listingId })
        .eq('id', productId);

      if (updateError) {
        console.error('Error updating product status:', updateError);
      } else {
        console.log(`Product ${productId} successfully synced to ${platform} with ID: ${listingId}`);
      }
    }
  },
  fetchProducts: async function (userId) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('user_id', userId)
      .eq('published', false);

    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }

    return data;
  },
  createEtsyListing: async function (product) {
    try {
      const etsyAccessToken = process.env.ETSY_ACCESS_TOKEN;
      const etsyShopId = process.env.ETSY_SHOP_ID;

      const response = await fetch(`https://api.etsy.com/v3/application/shops/${etsyShopId}/listings`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${etsyAccessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: product.title,
          description: product.description,
          price: {
            amount: product.price,
            currency_code: 'USD'
          },
          quantity: 1,
          who_made: 'i_did',
          when_made: '2020_2023',
          taxonomy_id: 69, // Jewelry category
          tags: [product.category],
          images: product.image_urls.map(url => ({ url }))
        })
      });

      const data = await response.json();
      if (response.ok) {
        return data.results[0].listing_id;
      } else {
        console.error('Etsy API error:', data);
        return null;
      }
    } catch (error) {
      console.error('Error creating Etsy listing:', error);
      return null;
    }
  },

  createEbayListing: async function (product) {
    try {
      const ebayAppId = process.env.EBAY_APP_ID;
      const ebayCertId = process.env.EBAY_CERT_ID;
      const ebayDevId = process.env.EBAY_DEV_ID;
      const ebayAuthToken = process.env.EBAY_AUTH_TOKEN;

      const authHeader = `X-EBAY-API-DEV-NAME: ${ebayDevId}\r\nX-EBAY-API-APP-NAME: ${ebayAppId}\r\nX-EBAY-API-CERT-NAME: ${ebayCertId}\r\nX-EBAY-API-SITEID: 0\r\nX-EBAY-API-CALL-NAME: AddFixedPriceItem\r\nX-EBAY-API-IAF-TOKEN: ${ebayAuthToken}`;

      const xmlBody = `
        <AddFixedPriceItemRequest xmlns="urn:ebay:apis:eBLBaseComponents">
          <ErrorLanguage>en_US</ErrorLanguage>
          <WarningLevel>High</WarningLevel>
          <Item>
            <Title>${product.title}</Title>
            <Description>${product.description}</Description>
            <PrimaryCategory>
              <CategoryID>281</CategoryID> <!-- Jewelry category -->
            </PrimaryCategory>
            <StartPrice>${product.price}</StartPrice>
            <Quantity>1</Quantity>
            <ListingDuration>Days_7</ListingDuration>
            <Country>US</Country>
            <Currency>USD</Currency>
            <ListingType>FixedPriceItem</ListingType>
            <PictureDetails>
              ${product.image_urls.map(url => `<PictureURL>${url}</PictureURL>`).join('')}
            </PictureDetails>
          </Item>
        </AddFixedPriceItemRequest>
      `;

      const response = await fetch('https://api.ebay.com/ws/api.dll', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/xml',
          'Authorization': authHeader
        },
        body: xmlBody
      });

      const xmlResponse = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlResponse, 'text/xml');
      const itemId = xmlDoc.getElementsByTagName('ItemID')[0]?.textContent;

      if (itemId) {
        return itemId;
      } else {
        console.error('eBay API error:', xmlResponse);
        return null;
      }
    } catch (error) {
      console.error('Error creating eBay listing:', error);
      return null;
    }
  },

  createShopifyListing: async function (product) {
    try {
      const shopifyAccessToken = process.env.SHOPIFY_ACCESS_TOKEN;
      const shopifyStoreUrl = process.env.SHOPIFY_STORE_URL;

      const response = await fetch(`${shopifyStoreUrl}/admin/api/2023-01/products.json`, {
        method: 'POST',
        headers: {
          'X-Shopify-Access-Token': shopifyAccessToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          product: {
            title: product.title,
            body_html: product.description,
            vendor: 'Your Vendor',
            product_type: product.category,
            images: product.image_urls.map(url => ({ src: url })),
            variants: [{
              price: product.price,
              inventory_quantity: 1
            }]
          }
        })
      });

      const data = await response.json();
      if (response.ok) {
        return data.product.id;
      } else {
        console.error('Shopify API error:', data);
        return null;
      }
    } catch (error) {
      console.error('Error creating Shopify listing:', error);
      return null;
    }
  },
  syncProduct: async function (productId, platform) {
    const { data: product, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single();

    if (error) {
      console.error('Error fetching product:', error);
      return;
    }

    // Use the new background processing function
    // Use the new background processing function
await this.createListingInBackground(productId, platform);

// Remove the existing platform-specific listing creation code

    // Implement retry logic for failed syncs
    let listingId;
    let retryCount = 0;
    const maxRetries = 3;
    const retryDelay = 5000; // 5 seconds

    while (retryCount < maxRetries && !listingId) {
      await new Promise(resolve => setTimeout(resolve, retryDelay));
      const { data: product, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single();

      if (error) {
        console.error('Error fetching product:', error);
        break;
      }

// Remove the switch statement for platform-specific listing creation

      if (listingId) {
        const { error: updateError } = await supabase
          .from('products')
          .update({ [`platform_status.${platform}_id`]: listingId })
          .eq('id', productId);

        if (updateError) {
          console.error('Error updating product status:', updateError);
        } else {
          console.log(`Product ${productId} successfully synced to ${platform} with ID: ${listingId}`);
          // Show toast notification
          this.showToast(`Listing pushed to ${platform}!`, 'success');

          // Fetch and display the listing URL
          let listingUrl;
          switch (platform) {
            case 'etsy':
              listingUrl = await this.getEtsyListingUrl(listingId);
              break;
            case 'ebay':
              listingUrl = await this.getEbayListingUrl(listingId);
              break;
            case 'shopify':
              listingUrl = await this.getShopifyListingUrl(listingId);
              break;
            default:
              console.error('Unsupported platform:', platform);
              break;
          }

          if (listingUrl) {
            // Update the UI with the listing URL
            const productRow = document.querySelector(`.product-row[data-product-id="${productId}"]`);
            if (productRow) {
              const urlElement = productRow.querySelector(`.${platform}-url`);
              if (urlElement) {
                urlElement.href = listingUrl;
                urlElement.textContent = listingUrl;
                urlElement.style.display = 'inline';
              }
            }
          }
        }
      } else {
        // Show toast notification for failed sync
        this.showToast(`${platform} sync failed — try again.`, 'error');
      }

      retryCount++;
    }

    if (!listingId) {
      console.error(`Failed to sync product ${productId} to ${platform} after ${maxRetries} retries.`);
      this.showToast(`${platform} sync failed after retries — manual intervention required.`, 'error');
    }

    // Check if auto-sync is enabled and sync to all platforms if so
    if (this.autoSyncEnabled) {
      const platforms = ['etsy', 'ebay', 'shopify'];
      for (const plat of platforms) {
        if (plat !== platform) {
          await this.syncProduct(productId, plat);
        }
      }
    }
  },

  // New function to handle background processing
  createListingInBackground: async function (productId, platform) {
    const { data: edgeFunctionResult, error: edgeFunctionError } = await supabase.functions.invoke('createListing', {
      body: JSON.stringify({ productId, platform })
    });

    if (edgeFunctionError) {
      console.error('Error invoking Edge Function:', edgeFunctionError);
      // Fallback to immediate execution if Edge Function fails
      await this.createListing(platform);
    } else {
      console.log('Edge Function invoked successfully:', edgeFunctionResult);
    }
  },

  getEtsyListingUrl: async function (listingId) {
    try {
      const etsyAccessToken = process.env.ETSY_ACCESS_TOKEN;
      const response = await fetch(`https://api.etsy.com/v3/application/listings/${listingId}`, {
        headers: {
          'Authorization': `Bearer ${etsyAccessToken}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        return data.results[0].url;
      } else {
        console.error('Etsy API error:', data);
        return null;
      }
    } catch (error) {
      console.error('Error fetching Etsy listing URL:', error);
      return null;
    }
  },

  getEbayListingUrl: async function (listingId) {
    try {
      const ebayAppId = process.env.EBAY_APP_ID;
      const ebayCertId = process.env.EBAY_CERT_ID;
      const ebayDevId = process.env.EBAY_DEV_ID;
      const ebayAuthToken = process.env.EBAY_AUTH_TOKEN;

      const authHeader = `X-EBAY-API-DEV-NAME: ${ebayDevId}\r\nX-EBAY-API-APP-NAME: ${ebayAppId}\r\nX-EBAY-API-CERT-NAME: ${ebayCertId}\r\nX-EBAY-API-SITEID: 0\r\nX-EBAY-API-CALL-NAME: GetItem\r\nX-EBAY-API-IAF-TOKEN: ${ebayAuthToken}`;

      const xmlBody = `
        <GetItemRequest xmlns="urn:ebay:apis:eBLBaseComponents">
          <ItemID>${listingId}</ItemID>
          <DetailLevel>ReturnAll</DetailLevel>
        </GetItemRequest>
      `;

      const response = await fetch('https://api.ebay.com/ws/api.dll', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/xml',
          'Authorization': authHeader
        },
        body: xmlBody
      });

      const xmlResponse = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlResponse, 'text/xml');
      const listingUrl = xmlDoc.getElementsByTagName('ViewItemURLForNaturalSearch')[0]?.textContent;

      if (listingUrl) {
        return listingUrl;
      } else {
        console.error('eBay API error:', xmlResponse);
        return null;
      }
    } catch (error) {
      console.error('Error fetching eBay listing URL:', error);
      return null;
    }
  },

  getShopifyListingUrl: async function (listingId) {
    try {
      const shopifyAccessToken = process.env.SHOPIFY_ACCESS_TOKEN;
      const shopifyStoreUrl = process.env.SHOPIFY_STORE_URL;

      const response = await fetch(`${shopifyStoreUrl}/admin/api/2023-01/products/${listingId}.json`, {
        headers: {
          'X-Shopify-Access-Token': shopifyAccessToken
        }
      });

      const data = await response.json();
      if (response.ok) {
        return `${shopifyStoreUrl}/products/${data.product.handle}`;
      } else {
        console.error('Shopify API error:', data);
        return null;
      }
    } catch (error) {
      console.error('Error fetching Shopify listing URL:', error);
      return null;
    }
  },
  showToast: function (message, type) {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  },
  renderPreview: function (products) {
    const previewContainer = document.getElementById('preview-container');
    previewContainer.innerHTML = '';

    // Add the "Sync Listings" tab to the Admin Dashboard
    const dashboardTabs = document.createElement('div');
    dashboardTabs.className = 'dashboard-tabs';
    previewContainer.appendChild(dashboardTabs);

    const inventoryTab = document.createElement('button');
    inventoryTab.textContent = 'Inventory';
    inventoryTab.onclick = () => {
      document.getElementById('sync-container').style.display = 'none';
      document.getElementById('preview-container').style.display = 'block';
      this.renderPreview(products);
    };
    dashboardTabs.appendChild(inventoryTab);

    const syncTab = document.createElement('button');
    syncTab.textContent = 'Sync Listings';
    syncTab.onclick = () => {
      document.getElementById('sync-container').style.display = 'block';
      document.getElementById('preview-container').style.display = 'none';
      this.renderSyncTab(products);
    };
    dashboardTabs.appendChild(syncTab);

    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'product-card';
      productCard.innerHTML = `
    <h3>${product.title}</h3>
    <p>${product.description}</p>
    <img src="${product.image_urls[0]}" alt="${product.title}" />
    <p>Price: $${product.price}</p>
    <button onclick="adminPreview.publishProduct('${product.id}')">Publish</button>
  `;
      previewContainer.appendChild(productCard);
    });
  },
  publishProduct: async function (productId) {
    await publishProduct(productId);
    this.fetchProducts(this.userId);
  }
};
